const express = require('express')
const fetch = require('isomorphic-fetch')
const path = require('path')
const favicon = require('serve-favicon')
const app = express()

app.use(express.static('public'))
app.use(favicon(path.join('public', 'assets', 'favicon.ico')))

app.get('/', (req, res) => res.sendFile('views/index.html',{root:'.'}))
app.get('/about', (req, res) => res.sendFile('views/about.html',{root:'.'}))
app.get('/video', (req, res) => res.sendFile('views/video.html',{root:'.'}))
app.get('/specs', (req, res) => res.sendFile('views/specs.html',{root:'.'}))
app.get('/downloads', (req, res) => res.sendFile('views/downloads.html',{root:'.'}))
app.get('/projects', (req, res) => res.sendFile('views/projects.html',{root:'.'}))
app.get('/files/:file(*)', function(req, res, next){
  var filePath = path.join('files', req.params.file)

  res.download(filePath, function (err) {
    if (!err) return // file sent
    if (err && err.status !== 404) return next(err) // non-404 error
    // File for Dwonload not found
    res.statusCode = 404
    res.send('Cant find that file, sorry!')
  })
})
app.use(function (req, res, next) {
  res.status(404).sendFile('views/404.html',{root:'.'})
})

app.listen(3000, () => console.log('christianpi.tk is now online and running on port 80'))