const express = require('express');
const ejs = require('ejs');
const find = require('array-find');
const slug = require('slug');
const bodyParser = require('body-parser');




express()
    .set('view engine', 'ejs')
    .set('views', 'views')
    .use(express.static('static'))
    .use(bodyParser.urlencoded({extended: true}))
    .get('/', home)
    .get('/profiles', profiles)
    .post('/profiles', add)
    .get('/profiles/:naam', profile)
    .get('/add-profile', form)
    .listen(3000, () => console.log('listening at localhost:3000'))

function home(req, res) {
    res.render('index')
}

var dataProfiles = [
    {
      naam: 'Nadine',
      geslacht: 'vrouw',
      leeftijd: '20',
      bio: 'Ik ben Nadine, woon in Amsterdam en studeer aan de HvA'
    },
    {
      naam: 'David',
      geslacht: 'man',
      leeftijd: '23',
      bio: 'Ik ben David, woon in Putten en werk als KAM-coördinator'
    },
    {
      naam: 'Gerrit',
      geslacht: 'man',
      leeftijd: '51',
      bio: 'Ik ben Gerrit, woon in Elspeet en werk als software-developer'
    }
  ]

  
function profiles(req, res) {
    res.render('list.ejs', {dataProfiles: dataProfiles})
  }

  
function profile(req, res, next) {
  var naam = req.params.naam;
  var profile = find(dataProfiles, function (value) {
    return value.naam === naam
  })

  if (!profile) {
    next()
    return
  }

  res.render('detail.ejs', {data: profile})
}

function form(req, res) {
  res.render('add.ejs')
}

function add(req, res) {
  var naam = slug(req.body.naam)

  dataProfiles.push({
    naam: naam,
    geslacht: req.body.geslacht,
    leeftijd: req.body.leeftijd,
    bio: req.body.bio
  })
  
  res.redirect('/profiles/' + naam)
}

  

