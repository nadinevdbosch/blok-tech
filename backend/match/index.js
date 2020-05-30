const express = require('express');
const ejs = require('ejs');
const find = require('array-find');
const slug = require('slug');
const bodyParser = require('body-parser');

require('dotenv').config();
const mongo = require('mongodb');
var db = null;
const url = process.env.mongodbURL;

mongo.MongoClient.connect(url, function(err, client) {
  if (err) throw err
  db= client.db(process.env.DB_NAME);
  console.log(process.env.DB_NAME);
})

express()
    .set('view engine', 'ejs')
    .set('views', 'views')
    .use(express.static('static'))
    .use(bodyParser.urlencoded({extended: true}))
    .get('/', startscreen)
    .get('/profiles', profiles)
    .get('/my-profile', myProfile)
    .post('/my-profile', add)
    .get('/profiles/:naam', profile)
    .get('/quiz-intro', quizIntro)
    .get('/quiz-question', quizQuestion)
    .listen(3000, () => console.log('listening at localhost:3000'))

function startscreen(req, res) {
    res.render('index')
}

var dataProfiles = [
    {
      naam: 'Nadine',
      geslacht: 'vrouw',
      voorkeur:'man',
      leeftijd: '20',
      bio: 'Ik ben Nadine, woon in Amsterdam en studeer aan de HvA'
    },
    {
      naam: 'David',
      geslacht: 'man',
      voorkeur:'vrouw',
      leeftijd: '23',
      bio: 'Ik ben David, woon in Putten en werk als KAM-coördinator'
    },
    {
      naam: 'Gerrit',
      geslacht: 'man',
      voorkeur:'vrouw',
      leeftijd: '51',
      bio: 'Ik ben Gerrit, woon in Elspeet en werk als software-developer'
    }
  ]

  var dataMyProfile = [];

  
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


function add(req, res) {
  var naam = slug(req.body.naam)

 dataMyProfile.push({
    naam: naam,
    geslacht: req.body.geslacht,
    voorkeur: req.body.voorkeur,
    leeftijd: req.body.leeftijd,
    bio: req.body.bio
  })

  res.redirect('/quiz-intro')
}

function myProfile(req, res) {
  res.render('my-profile', {data: dataMyProfile})
}

function quizIntro(req, res) {
  res.render('quiz-intro')
}

function quizQuestion(req, res) {
  res.render('quiz-question')
}

  
// db.collection('project-tech').insertOne(
//   {
//     naam: "Nadine",
//     geslacht: "vrouw",
//     voorkeur: "man",
//     leeftijd: "20",
//     bio: "mijn naam is Nadine"
//   }

  console.log(dataMyProfile);
