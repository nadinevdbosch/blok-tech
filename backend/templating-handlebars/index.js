const express = require('express');
const app = express();
const expressHandlebars = require('express-handlebars');

app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('static'));
// app.locals.layout = false;

//routing
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', function(req, res){
    res.render('about');
});

app.listen(8000);