const mongoose = require("mongoose")
var File = require('../models/file')

//Listar Alunos
module.exports.list = () => {
    return File
        .find()
        .sort({date:1})
        .exec()
}

//Procurar Aluno por Id
module.exports.lookUp = id => {
    return File
        .findOne({_id: mongoose.Types.ObjectId(id)})
        .exec()
}

//Inserir Aluno
module.exports.insert = file =>{
    var newFile = new File(file)
    return newFile.save()
}

//module.exports.update
//module.exports.delete
module.exports.delete = id => {
    return File
        .deleteOne({_id: mongoose.Types.ObjectId(id)})
        .exec()
}