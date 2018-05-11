const express = require('express')
const path = require('path');
const app = express()
const fetch = require('isomorphic-fetch')

app.use(express.static('public'))
app.get('/', (req, res) => res.sendFile('views/index.html',{root:'.'}))
app.get('/about', (req, res) => res.sendFile('views/about.html',{root:'.'}))
app.get('/shop', (req, res) => res.sendFile('views/shop.html',{root:'.'}))
app.get('/stfu', (req, res) => res.sendFile('views/stfu.html',{root:'.'}))
app.get('/specs', (req, res) => res.sendFile('views/specs.html',{root:'.'}))
app.get('/downloads', (req, res) => res.sendFile('views/downloads.html',{root:'.'}))
app.get('/files/:file(*)', function(req, res, next){
  var filePath = path.join(__dirname, 'files', req.params.file);

  res.download(filePath, function (err) {
    if (!err) return; // file sent
    if (err && err.status !== 404) return next(err); // non-404 error
    // file for download not found
    res.statusCode = 404;
    res.send('Cant find that file, sorry!');
  });
});
app.use(function (req, res, next) {
  res.status(404).sendFile('views/404.html',{root:'.'})
})

app.listen(3000, () => console.log('Webserver running on port 3000!'))