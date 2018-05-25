const express = require('express')
const fetch = require('isomorphic-fetch')
const path = require('path')
const app = express()

app.use(express.static('public'))
app.get('/', (req, res) => res.sendFile('views/index.html',{root:'.'}))
app.get('/about', (req, res) => res.sendFile('views/about.html',{root:'.'}))
app.get('/video', (req, res) => res.sendFile('views/video.html',{root:'.'}))
app.get('/specs', (req, res) => res.sendFile('views/specs.html',{root:'.'}))
app.get('/downloads', (req, res) => res.sendFile('views/downloads.html',{root:'.'}))
app.get('/twitch', (req, res) => {
  res.status(301).redirect('https://twitch.tv/ImTotallyNotMessi')
})
app.get('/youtube', (req, res) => {
  res.status(301).redirect('https://youtube.com/ImTotallyNotMessi')
})
app.get('/github', (req, res) => {
  res.status(301).redirect('https://github.com/ImTotallyNotMessi')
})
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

app.listen(3000, () => console.log('christianpi.tk is now online and running on port 3000!'))
// app.listen(80, () => console.log('christianpi.tk is now online and running on port 80'))