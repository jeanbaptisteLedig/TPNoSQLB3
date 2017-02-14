var mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.182.134:27018/demonosql');

module.exports = mongoose;
