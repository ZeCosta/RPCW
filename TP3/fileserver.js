const http = require('http')
const fs = require('fs')

const url = require('url')



myserver = http.createServer(function (req,res){
    console.log(req.method + " " + req.url)
    var myurl = url.parse(req.url,true).pathname
    
    file=myurl.substring(1)
    arrStrings=myurl.split("/")
    console.log(arrStrings)

    if(arrStrings[1]=="filmes"){
        if(arrStrings.length==2){
            file="index.html"
        }else{
            file=arrStrings[1]+"/"+arrStrings[2]+".html"
        }
    }
    else{
        if(arrStrings[1]=="atores"){
            if(arrStrings.length==2){
                file="atores.html"
            }else{
                file=arrStrings[1]+"/"+arrStrings[2]+".html"
            }
        }
        else{
            file=arrStrings[1]
        }
    }


    console.log("ficheiro requirido: "+file)

    fs.readFile(file, function(err, data){
        if(err){
            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
            res.write("<h1>Erro na leitura do ficheiro...</h1>");
        }else{
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write(data);
        }
        res.end();
    })
})

myserver.listen(7777);
console.log('Servidor à escuta na porta 7777');
console.log('http://localhost:7777/filmes');