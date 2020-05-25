const express = require('express')

express()
    .use(express.static('static'))
    .get('/test', test)
    .get('/hoi', hoi)
    .get('/naomi', naomi)
    .listen(8000)
 
function test(req, res) {
    res.status(200).send('Server says hello')
}

function hoi(req, res) {
    res.status(200).send('This is a server, duhhhh')
}

function naomi(req, res) {
    res.status(200).send('Speciaal voor naomi')
}

