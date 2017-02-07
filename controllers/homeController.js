var router = require('express').Router();
var Person = require('../models/Person');

// Permet de créer une route qui map l'url "/" en GET
router.get('/', function(req, res) {
    // Permet de retrouver des résultats sur un modèle
    Person.find({}).then(function(persons) {
        // Permet d'afficher une vue et de lui passer des paramètres
        console.log(persons);
        res.render('home.ejs', { persons: persons});
    });

});

// Permet de créer une route qui map l'url "/hello" en GET
router.get('/hello', function(req, res) {
    var p = new Person({
        firstname: 'Ted',
        lastname: 'Mosby',
        age: 30
    });

    // Permet d'insérer une nouvelle donnée
    p.save().then(function(personSaved){
        res.render('hello.ejs', personSaved);
    });
});

router.get('/add', function(req, res) {
    res.render('add.ejs');
});

router.post('/add', function(req, res) {
    res.redirect('/add');
});

router.get('/list', function(req, res) {
    res.render('list.ejs');
});

router.get('/loadData', function(req, res) {
    var fs = require("fs");

    fs.readFile('./data/persons.csv', 'utf-8', function(err, data) {
        if (err) throw err;
        var lines = data.trim().split('\n');
        for (var i=1; i < lines.length; i++){

            var arrayLines = lines[i].split(',');
            var person = new Person({
                                firstname : arrayLines[0],
                                lastname : arrayLines[1],
                                gender : arrayLines[2],
                                age : arrayLines[3],
                                company : arrayLines[4],
                                departement : arrayLines[5],
                                email : arrayLines[6],
                                city : arrayLines[7],
                                country : arrayLines[8],
                                ip_adresse : arrayLines[9],
            })
            person.save().then(function(personSaved){
                //console.log("ok")
            });
        }
    })
});

module.exports = router;
