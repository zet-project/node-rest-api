var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExampleSchema = new Schema({
    name: String
});

module.exports = mongoose.model('ExampleItem', ExampleSchema);