const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs');

module.exports.scrap = async (url) => {
  return axios(url).then(response => {
    const regex = /var markers = (.*);$/gm
    const matches = regex.exec(response.data)

    const companies = JSON.parse(matches[1]).map(c => {
      const { name, address, contact } = c.companies[0]
      if (!contact && !contact.email) return
      return {
        name,
        address,
        email: contact.email
      }
    })
    
    return companies.filter(c => c.email !== null)
  })
  .catch(console.error)
}
