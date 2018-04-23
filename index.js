var browserify = require('browserify-middleware');
const express = require('express')
const app = express()
const fetch = require('isomorphic-fetch')

app.use(express.static('public')) 
//Home Page
app.get('/', (req, res) => res.sendFile('index.html',{root:'.'}))
//About Page
app.get('/about.html', (req, res) => res.sendFile('about.html',{root:'.'}))
//Social Page
app.get('/social.html', (req, res) => res.sendFile('social.html',{root:'.'}))
//Meme Page
app.get('/stfu.html', (req, res) => res.sendFile('stfu.html',{root:'.'}))
//PC Specs
app.get('/specs.html', (req, res) => res.sendFile('CHRISTIAN-PC.html',{root:'.'}))
//Website Proxy
app.get('/proxy/:secret/:query', (req, res) => {
    console.log(process.env.SECRET)
    if(req.params.secret == process.env.SECRET){
     fetch('https://'+req.params.query)
      .then(data=>{
       return data.text()
     })
      .then(str=>{
       res.send(str)
     })
      .catch(e=>{
       console.log(e)
       res.send(e)
     })
    }else{
      console.log('INTRUDER!')
     res.sendFile('/keepout.html',{root:'.'})
    }
  })

app.listen(3000, () => console.log('Webserver running on port 3000!'))