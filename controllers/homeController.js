var router = require('express').Router();
var Person = require('../models/Person');
var bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({extended: false}));

// Permet de créer une route qui map l'url "/" en GET
router.get('/page/:page', function(req, res) {
    if(!req.params.page){
    next()
  }
    // Permet de retrouver des résultats sur un modèle
    Person.find({}).then(function(persons) {
      var currentPage=parseInt(req.params.page);
      var nbPage = persons.length/100;
      var min,limit,pageMin,pageMax;

      pageMin = currentPage-4;
      

      if(currentPage<=0){
        currentPage=1;
      }
        if(currentPage<=nbPage){
            pageMax= currentPage;
        }else{
            pageMax= currentPage+4;
        }
      min=currentPage*100-100;
      

      Person.find({}).skip(min).limit(limit).then(function(p) {
          res.render('home.ejs', { persons: p, pages: nbPage, current: currentPage, pmi: pageMin, pma: pageMax});
      });
    });

});
router.get('/', function(req, res) {
  Person.find({}).then(function(persons) {
    var nbPage = persons.length/100;
    var currentPage=parseInt(1);
    var min,limit;

    if(currentPage<=0){
      currentPage=1;
    }
    min=currentPage*100-100;
    limit=100;

    Person.find({}).skip(min).limit(limit).then(function(p) {
      // Permet d'afficher une vue et de lui passer des paramètre
      res.render('home.ejs', { persons: p, pages: nbPage, current: currentPage});
    });
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
        
    Person.find({ip_address : { $regex : /^([0-9]{1,3}.)129\..*/ } })
            .then(function(personThree){
        
    Person.find({
              "email": /[0-9]/ })
              .count().then(function(personFour){
    Person.aggregate({
                        
                        $group:
                        {
                            _id:"$company",
                            nbrFemmes:{$sum: {$cond: {if: {$eq:["$gender","Female"]}, then:1, else:0 } } },
                            totalPersonnes:{$sum:1},
                        }
                        },
                     {$project:
                        {
                            _id:0,
                            company:"$_id",
                            percent:{$divide:["$nbrFemmes","$totalPersonnes"]}
                        }
                        },
                     {$sort:{percent:-1}},
                     {$limit:1})
                        .then(function(personFive){
                
         
    res.render('stat.ejs', { personOne: personOne, personTwo: personTwo, personThree: personThree, personFour: personFour, personFive: personFive});
  });
        });
});
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
