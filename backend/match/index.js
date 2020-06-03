const express = require('express');
const ejs = require('ejs');
const find = require('array-find');
const slug = require('slug');
const bodyParser = require('body-parser');
const multer  = require('multer')
const path = require('path')

require('dotenv').config();
const mongo = require('mongodb');
var db = null;
const url = process.env.mongodbURL;

mongo.MongoClient.connect(url, function(err, client) {
  if (err) throw err
  db= client.db(process.env.DB_NAME);
})


// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, 'static/uploads');
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, Date.now() + '.png');
// 	}
// });
// const upload = multer({
// 	storage: storage
// });

var uploadFile = multer ({dest: 'static/uploads/'})

const storage = multer.diskStorage({
  destination:(req, file, cb) => {
    cb(null,'static/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '.jpg');
  }
});


express()
    .set('view engine', 'ejs')
    .set('views', 'views')
    .use(express.static('static'))
    .use(bodyParser.urlencoded({extended: true}))
    .get('/', startscreen)
    .get('/profiles', profiles) 
    .get('/my-profile', myProfile)
    // .post('/my-profile', upload.single('profielfoto'), add)
    .post('/my-profile', uploadFile.single('profielfoto'), add, (req, res) => {
      console.log(req.file);
      })
    .get('/profiles/:naam', profile)
    .get('/quiz-intro', quizIntro)
    .get('/quiz-question', quiz)
    .listen(3000, () => console.log('listening at localhost:3000'))

function startscreen(req, res) {
    res.render('index')
}

// var dataProfiles = [
//     {
//       naam: 'Nadine',
//       geslacht: 'vrouw',
//       voorkeur:'man',
//       leeftijd: '20',
//       bio: 'Ik ben Nadine, woon in Amsterdam en studeer aan de HvA'
//     },
//     {
//       naam: 'David',
//       geslacht: 'man',
//       voorkeur:'vrouw',
//       leeftijd: '23',
//       bio: 'Ik ben David, woon in Putten en werk als KAM-coördinator'
//     },
//     {
//       naam: 'Gerrit',
//       geslacht: 'man',
//       voorkeur:'vrouw',
//       leeftijd: '51',
//       bio: 'Ik ben Gerrit, woon in Elspeet en werk als software-developer'
//     }
//   ]



  
function profiles(req, res) {
    res.render('list.ejs', {dataProfiles: dataProfiles})
}


var dataMyProfile;

// function add(req, res) {
//   var naam = slug(req.body.naam)

//  dataMyProfile = {
//     naam: naam,
//     geslacht: req.body.geslacht,
//     voorkeur: req.body.voorkeur,
//     leeftijd: req.body.leeftijd,
//     bio: req.body.bio,

//   }
//   console.log(req.body.file)
//   res.redirect('/quiz-intro')
// }

function add(req, res) {
var naam = slug(req.body.naam)
 dataMyProfile = {
    naam: naam,
    geslacht: req.body.geslacht,
    voorkeur: req.body.voorkeur,
    leeftijd: req.body.leeftijd,
    bio: req.body.bio,
    profielfoto: req.file ? req.file.filename : null,
  }
 res.redirect('/quiz-intro')
 console.log(req.file)
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


var dataProfiles = [];


function profiles(req, res, next) {
  db.collection('users').find().toArray(done)

  function done(err, profilesData) {
    if (err) {
      next(err)
    } else {
      res.render('list', {data: profilesData})
    }
    dataProfiles = profilesData
  }
  
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

  res.render('detail', {data: profile})
}


// function quiz(req, res, next) {
//   db.collection('questions').find().toArray(questions)
//   db.collection('Answers').find().toArray(answers)
//   var dataQuestions
//   var dataAnswers


//   function questions(err, questionData) {
//     if (err) {
//       next(err)
//     } else {
//       dataQuestions = questionData
//     }
    
//   }

//   function answers(err, answerData) {
//     if (err) {
//       next(err)
//     } else {
//       dataAnswers = answerData
//     }
//   }

//   console.log(dataQuestions)
// }

var dataQuestions = [];
var dataAnswers = [];


function quiz(req, res, next) {
  db.collection('questions').find().toArray(questions)
  db.collection('Answers').find().toArray(answers)

  function questions(err, questionsData) {
    if (err) {
      next(err)
    } else {
      res.render('quiz-question', {data: questionsData})
    }
    dataQuestions = questionsData
  }

  function answers(err, answersData) {
    if (err) {
      next(err)
    } else {
      dataAnswers = answersData
    }
  }
  
}
