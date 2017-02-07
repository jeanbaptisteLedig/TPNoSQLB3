var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var papa = require('babyparse')


// Permet de changer le système de promesses de mongo par celui de Node
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({
    extended: true
}));

// Permet de definir un template engine
app.set('view engine', 'ejs');

// Middleware qui permet de rendre les fichiers
// statiques sans créer de routes particulières
app.use('/public', express.static(__dirname+'/public'));

// Middleware qui permet d'appliquer du ctrl en question sur le pattern /
app.use('/', require('./controllers/homeController'));

// Permet de lancer le serveur web et d'écouter des requêtes
app.listen(1337, function() {
    console.log('App is running on port 1337');
})
