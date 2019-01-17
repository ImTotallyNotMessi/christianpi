const express = require('express')
const fetch = require('isomorphic-fetch')
const path = require('path')
const favicon = require('serve-favicon')
const app = express()
const jsonstore = require('jsonstore.io') 
let db = new jsonstore(process.env.KEY)

app.use(express.static('public'))
app.use(favicon(path.join('public', 'assets', 'favicon.ico')))

app.get('/', (req, res) => res.sendFile('views/index.html',{root:'.'}))
app.get('/about', (req, res) => res.sendFile('views/about.html',{root:'.'}))
app.get('/downloads', (req, res) => res.sendFile('views/downloads.html',{root:'.'}))
app.get('/resume', (req, res) => res.sendFile('views/resume.html',{root:'.'}))
app.get('/url-shortener', (req, res) => res.sendFile('views/tyni.html',{root:'.'}))
app.get('/shorten', (req, res) => {
	db.write(req.query.key, {"url": req.query.url});
	res.status(200);
});
app.get('/:key', (req, res) => {
	db.read(req.params.key + "/url").then( (url) => {
		res.redirect(url);
	});
}); 
app.get('/twitch', (req, res) => {
  res.status(301).redirect('https://www.twitch.tv/imtotallynotmessi')
})
app.get('/github', (req, res) => {
  res.status(301).redirect('https://www.github.com/imtotallynotmessi/christianpi')
})
app.get('/files/:file(*)', function(req, res, next){
  var filePath = path.join('files', req.params.file)

  res.download(filePath, function (err) {
    if (!err) return // file sent
    if (err && err.status !== 404) return next(err) // non-404 error
    // File for Dwonload not found
    res.statusCode = 404
    res.sendFile('views/404.html',{root:'.'})
  })
})

app.use(function (req, res, next) {
  res.status(404).sendFile('views/404.html',{root:'.'})
})

app.listen(80, () => console.log('christianpi.tk is now online and running on port 80'))