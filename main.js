const { app, BrowserWindow, ipcMain } = require('electron')

const scrapper = require('./scrapper')
const path = require('path')

app.on('ready', function () {
  const window = new BrowserWindow({ width: 800, height: 600, webPreferences: { nodeIntegration: true } })
  window.loadURL(path.join('file://', __dirname, 'static/index.html'))

  ipcMain.on('PARSE_SITE', (event, args) => {
    scrapper.scrap(args.url).then(data => {
      window.webContents.send('PARSED_SITE', data)
    })  
  })
})

app.on('close', function () {
  window = null
})
