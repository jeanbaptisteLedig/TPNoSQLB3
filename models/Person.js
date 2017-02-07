var mongoose = require('../config/db');
var Schema = mongoose.Schema;

// Définit la structure des données pour ce schéma
var personSchema = new Schema({
    firstname: "String",
    lastname: "String",
    age: "Number",
    gender: "String",
    company: "String",
    departement: "String",
    email: "String",
    city: "String",
    country: "String",
    ip_adresse: "String",
    
    
    
}, {collection: 'persons'});

// Exporte le modèle basé sur le schéma
module.exports = mongoose.model('Person', personSchema);
