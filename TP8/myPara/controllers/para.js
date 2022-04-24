const mongoose = require("mongoose")
var Para = require('../models/para')

//Listar Paragrafos
module.exports.listar = function(){
    return Para
        .find()
        .exec()
}

//Inserir Paragrafo
module.exports.inserir = p =>{
    var d = new Date()
    p.data=d.toISOString().substring(0,16)
    delete p["_id"];

    var novoPara = new Para(p)
    return novoPara.save()
}

//eliminar Paragrafo
module.exports.eliminar = id => {
    return Para
        .deleteOne({_id: mongoose.Types.ObjectId(id)})
        .exec()
}

//update Paragrafo
module.exports.alterar = p => {
    p._id=mongoose.Types.ObjectId(p._id)
    return Para
        .findByIdAndUpdate(p._id,p)
        .exec()
}