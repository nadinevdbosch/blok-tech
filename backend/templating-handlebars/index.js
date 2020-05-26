const express = require('express');
const app = express();
const expressHandlebars = require('express-handlebars');
const path = require('path');

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main', 
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
// app.set('views', 'views');
app.set('view engine', 'handlebars');
app.use(express.static('static'));
// app.locals.layout = false;

//routing
app.get('/home', (req, res) => {
    res.render('index', { 
        title: 'Home'
    });
});

app.get('/about', function(req, res){
    res.render('about', { 
        title: 'About',
        name: 'Nadine',
        displayName: false
     });
});

app.get('/lists', function(req, res){
    res.render('lists', { 
        title: 'lists',
        list: [
            {
                items: ['banaan', 'appel', 'peer']
            },

            {
                items: ['melk', 'sap', 'cola']
            }
        ]
     });
});

app.listen(8000);