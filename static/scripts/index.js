(function(){
  const { ipcRenderer } = require('electron')
  const path = require('path')

    document.getElementById('get_data').addEventListener('click', function (e) {
        ipcRenderer.send('PARSE_SITE', {
            url: document.getElementById('url').value
        })
    })

    ipcRenderer.on('PARSED_SITE', (event, data) => {
        document.getElementById('output').innerText = data.map(c => c.email).join(';')

        const table = document.getElementById("table_data");

        data.forEach(c => {
            const row = table.insertRow(1);
            const name = row.insertCell(0);
            const address = row.insertCell(1);
            const email = row.insertCell()

            name.innerHTML = c.name
            address.innerHTML = c.address
            email.innerHTML = c.email
        })
       
    })
})()