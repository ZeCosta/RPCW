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