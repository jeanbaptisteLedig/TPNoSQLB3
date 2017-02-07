var mongoose = require('../config/db');
var Schema = mongoose.Schema;

// Définit la structure des données pour ce schéma
var personSchema = new Schema({
    firstname: "String",
    lastname: "String",
    age: "Number"
}, {collection: 'persons'});

// Exporte le modèle basé sur le schéma
module.exports = mongoose.model('Person', personSchema);
