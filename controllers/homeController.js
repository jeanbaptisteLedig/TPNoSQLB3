var router = require('express').Router();
var Person = require('../models/Person');
var bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({extended: false}));

// Permet de créer une route qui map l'url "/" en GET
router.get('/', function(req, res) {
    // Permet de retrouver des résultats sur un modèle
    Person.find({}).then(function(persons) {
        // Permet d'afficher une vue et de lui passer des paramètres
       
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
    var p = new Person( {
        firstname : req.body.user.firstname,
        lastname : req.body.user.lastname,
        age : req.body.user.age,
        gender : req.body.user.gender,
        email : req.body.user.email,
        company : req.body.user.company,
        departement : req.body.user.departement,
        city : req.body.user.city,
        country : req.body.user.country,
        ip_adresse : req.body.user.ip_adresse
        
        
        
    });
    
    p.save().then(function(personSaved){
        res.render('hello.ejs', personSaved);
    });
   
});


router.get('/list', function(req, res) {
    res.render('list.ejs');
});
router.get('/loadData', function(req, res) {
    res.render('loadData.ejs');
});
router.get('/stat', function(req, res) {
     Person.find({
    $and: [{"gender": "Male"},{"age": {$gte: 20,$lte: 40}},{$or: [{"company": "Voolith"},{"company": "Brightbean"}]}]
    }).then(function(personOne){
    
    Person.find({
    $and: [ { "company": "Buzzdog" }, {"gender": "Female" }]  }
    ).sort({"age" : -1}).limit(1).then(function(personTwo){
         
    res.render('stat.ejs', { personOne: personOne, personTwo: personTwo});
  });
   
});

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
