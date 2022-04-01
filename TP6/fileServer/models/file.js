var mongoose = require('mongoose')

var fileSchema = new mongoose.Schema({
    date: String,
    name: String,
    mimetype: String,
    size: String,
    description: String
})

module.exports = mongoose.model('file', fileSchema)