const express = require('express');
const ejs = require('ejs');

express()
    .set('view engine', 'ejs')
    .use(express.static('static'))
    .get('/', home)
    .get('/test', test)
    .get('/hoi', hoi)
    .get('/profile/:name', profile)
    .listen(3000)

function home(req, res) {
    res.status(200).send('Dit is de homepagina');
}
 
function test(req, res) {
    res.status(200).send('Dit is een testpagina');
}

function hoi(req, res) {
    res.status(200).send('Hoi. Wat leuk dat je hier een kijkje  neemt');
}

function profile(req, res) {
    res.render('profile', {name: req.params.name})
}

