const express = require('express')
const app = express()
const fetch = require('isomorphic-fetch')

app.use(express.static('public'))
app.get('/', (req, res) => res.sendFile('index.html',{root:'.'}))
app.get('/about.html', (req, res) => res.sendFile('about.html',{root:'.'}))
app.get('/shop.html', (req, res) => res.sendFile('shop.html',{root:'.'}))
app.get('/stfu.html', (req, res) => res.sendFile('stfu.html',{root:'.'}))
app.get('/specs.html', (req, res) => res.sendFile('specs.html',{root:'.'}))
app.use(function (req, res, next) {
  res.status(404).sendFile('404.html',{root:'.'})
})
app.listen(3000, () => console.log('Webserver running on port 3000!'))