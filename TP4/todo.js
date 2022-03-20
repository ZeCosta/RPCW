var http = require('http')
var axios = require('axios')
var fs = require('fs')
var static = require('./static.js')
var {parse} = require('querystring')

function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body=''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}


// Template para a pÃ¡gina------------------
function geraPagina(porfazer,realizada,d){
    let pagHTML = `
    <!DOCTYPE html>
<html>
    <head>
        <title>ToDo Task Manager</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png">
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-container w3-teal">
            <h2>ToDo - As Minhas Tarefas </h2>
        </div>

        <div class="w3-container">
            <h4>Adicionar/Alterar Tarefa</h4>
            <form class="w3-container" action="/tarefas" method="POST">
                <table>
                    <tr>
                        <td><label class="w3-text-teal"><b>Id</b></label></td>
                        <td><input class="w3-input w3-light-grey" type="text" name="id"></td>
                    </tr>
                    <tr>
                        <td><label class="w3-text-teal"><b>Data Inicio</b></label></td>
                        <td><input class="w3-input w3-light-grey" type="date" name="dateCreated"></td>
                    </tr>
                    <tr>
                        <td><label class="w3-text-teal"><b>Data Limite</b></label></td>
                        <td><input class="w3-input w3-light-grey" type="date" name="dateDue"></td>
                    </tr>
                    <tr>
                        <td><label class="w3-text-teal"><b>Quem</b></label></td>
                        <td><input class="w3-input w3-light-grey" type="text" name="who"></td>
                    </tr>
                    <tr>
                        <td><label class="w3-text-teal"><b>Oque</b></label></td>
                        <td><input class="w3-input w3-light-grey" type="text" name="what"></td>
                    </tr>
                </table>
                <input type="hidden" name="type" value="porfazer">
          
                <input class="w3-btn w3-blue-grey" type="submit" value="Registar/Atualizar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>
        </div>
        
        <div class="w3-container">
            <h4>Tarefas Por fazer</h4>
            <ul>
                <table>
                    `
            porfazer.forEach(pf => {
                pagHTML+= `<tr>
                        <td><li>${pf.id}</li></td>
                        <td><a class="w3-green" href="/tarefas/${pf.id}/realizada">feito</a></td>
                        <td><a class="w3-blue-grey" href="/tarefas?id=${pf.id}">editar</a></td>
                    </tr>`
            });
            pagHTML+=`
                </table>
            </ul>
        </div>

        <div class="w3-container">
            <h4>Tarefas feitas</h4>
            <ul>
                <table>`
            realizada.forEach(r => {
                pagHTML+= `<tr>
                        <td><li>${r.id}</li></td>
                        <td><a class="w3-red" href="/tarefas/${r.id}/apagar">eliminar</a></td>
                    </tr>`
            });
            pagHTML+=`
                </table>
            </ul>
        </div>
        
        
        <footer class="w3-container w3-teal">
            <address>Gerado por ToDo::RPCW2022 em ${d}</address>
        </footer>
    </body>
</html>
  `
  return pagHTML
}


function geraPaginaEditar(porfazer,realizada,d,tarefa){
    let pagHTML = `
    <!DOCTYPE html>
<html>
    <head>
        <title>ToDo Task Manager</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png">
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-container w3-teal">
            <h2>ToDo - As Minhas Tarefas </h2>
        </div>

        <div class="w3-container">
            <h4>Adicionar/Alterar Tarefa</h4>
            <form class="w3-container" action="/tarefas" method="POST">
                <table>
                    <tr>
                        <td><label class="w3-text-teal"><b>Id</b></label></td>
                        <td><input class="w3-input w3-light-grey" type="text" name="id" value="${tarefa.id}"></td>
                    </tr>
                    <tr>
                        <td><label class="w3-text-teal"><b>Data Inicio</b></label></td>
                        <td><input class="w3-input w3-light-grey" type="date" name="dateCreated" value="${tarefa.dateCreated}"></td>
                    </tr>
                    <tr>
                        <td><label class="w3-text-teal"><b>Data Limite</b></label></td>
                        <td><input class="w3-input w3-light-grey" type="date" name="dateDue" value="${tarefa.dateDue}"></td>
                    </tr>
                    <tr>
                        <td><label class="w3-text-teal"><b>Quem</b></label></td>
                        <td><input class="w3-input w3-light-grey" type="text" name="who" value="${tarefa.who}"></td>
                    </tr>
                    <tr>
                        <td><label class="w3-text-teal"><b>Oque</b></label></td>
                        <td><input class="w3-input w3-light-grey" type="text" name="what" value="${tarefa.what}"></td>
                    </tr>
                </table>
                <input type="hidden" name="type" value="porfazer">
          
                <input class="w3-btn w3-blue-grey" type="submit" value="Registar/Atualizar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>
        </div>
        
        <div class="w3-container">
            <h4>Tarefas Por fazer</h4>
            <ul>
                <table>
                    `
            porfazer.forEach(pf => {
                pagHTML+= `<tr>
                        <td><li>${pf.id}</li></td>
                        <td><a class="w3-green" href="/tarefas/${pf.id}/realizada">feito</a></td>
                        <td><a class="w3-blue-grey" href="/tarefas?id=${pf.id}">editar</a></td>
                    </tr>`
            });
            pagHTML+=`
                </table>
            </ul>
        </div>

        <div class="w3-container">
            <h4>Tarefas feitas</h4>
            <ul>
                <table>`
            realizada.forEach(r => {
                pagHTML+= `<tr>
                        <td><li>${r.id}</li></td>
                        <td><a class="w3-red" href="/tarefas/${r.id}/apagar">eliminar</a></td>
                    </tr>`
            });
            pagHTML+=`
                </table>
            </ul>
        </div>
        
        
        <footer class="w3-container w3-teal">
            <address>Gerado por ToDo::RPCW2022 em ${d}</address>
        </footer>
    </body>
</html>
  `
  return pagHTML
}



// Criação do servidor
var todoServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // GET static files (e.g. /w3.css) ------------------------------------------------------------------------
    if(static.recursoEstatico(req)){
        static.sirvoRecursoEstatico(req, res)
    }else{ 
        switch(req.method){
            case "GET": 
                // GET /alunos --------------------------------------------------------------------
                if((req.url == "/") || (req.url == "/tarefas")){
                    //get tasks done and not done -> create page
                    axios.get("http://localhost:3000/tarefas?type=porfazer")
                        .then(response => {
                            var porfazer = response.data
                            axios.get("http://localhost:3000/tarefas?type=realizada")
                                .then(response2 => {
                                    var realizada = response2.data
                                    
                                    // Add code to render page with the student's list
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(geraPagina(porfazer,realizada,d))
                                    res.end()
                                })
                                .catch(function(erro2){
                                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Não foi possível obter a lista de tarefas realizadas...")
                                    res.end()
                                })
                        })
                        .catch(function(erro){
                            res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de tarefas por fazer...")
                            res.end()
                        })
                }
                // GET /alunos/:id/apagar --------------------------------------------------------------------
                else if(/\/tarefas\/[a-z][a-zA-Z0-9]+\/apagar$/.test(req.url)){
                    var idTarefa = req.url.split("/")[2]
                    axios.delete('http://localhost:3000/tarefas/'+idTarefa)
                        .then(resp => {
                            res.writeHead(303, {"Location":"/tarefas"})
                            res.end()
                        })
                        .catch(error => {
                            console.log(error);
                            res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("error")
                            res.end()
                        });
                    
                // GET /alunos/:id/realizada --------------------------------------------------------------------
                }else if(/\/tarefas\/[a-zA-Z0-9]+\/realizada$/.test(req.url)){
                    var idTarefa = req.url.split("/")[2]
                    axios.get("http://localhost:3000/tarefas/" + idTarefa)
                        .then( response => {
                            let tarefa = response.data
                            //if(tarefa['type'==="porfazer"]){
                                tarefa['type']="realizada"
                                axios.put("http://localhost:3000/tarefas/" + idTarefa,tarefa)
                                    .then(resp=> {
                                        res.writeHead(303, {"Location":"/tarefas"})
                                        res.end()
                                    })
                            //}                            
                        })
                        .catch(function (error){
                            console.log(error);
                            res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("error")
                            res.end()
                        });
                }
                else if(/\/tarefas\?id=[a-zA-Z0-9]+$/.test(req.url)){
                    var idTarefa = req.url.split("=")[1]
                    axios.get('http://localhost:3000/tarefas/'+idTarefa)
                        .then(resp => {
                            let tarefa = resp.data
                            
                            axios.get("http://localhost:3000/tarefas?type=porfazer")
                                .then(response => {
                                    var porfazer = response.data
                                    axios.get("http://localhost:3000/tarefas?type=realizada")
                                        .then(response2 => {
                                            var realizada = response2.data
                                            
                                            // Add code to render page with the student's list
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write(geraPaginaEditar(porfazer,realizada,d,tarefa))
                                            res.end()
                                        })
                                        .catch(function(erro2){
                                            res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write("<p>Não foi possível obter a lista de tarefas realizadas...")
                                            res.end()
                                        })
                                })
                                .catch(function(erro){
                                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Não foi possível obter a lista de tarefas por fazer...")
                                    res.end()
                                })
                        })
                        .catch(error => {
                            console.log(error);
                            //res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                            res.writeHead(303, {"Location":"/tarefas"})
                            res.end()
                        });
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                    res.end()
                }
                break
            case "POST":
                if(req.url="/tarefas"){
                    recuperaInfo(req, resultado=>{
                        console.log('POST de tarefa:' +JSON.stringify(resultado))

                        axios.get("http://localhost:3000/tarefas/" + resultado["id"])
                        .then( response => {
                            axios.put("http://localhost:3000/tarefas/" + resultado["id"],resultado)
                            .then(resp=> {
                                res.writeHead(303, {"Location":"/tarefas"})
                                res.end()
                            })                          
                        })
                        .catch(function (error){
                            axios.post('http://localhost:3000/tarefas',resultado)
                            .then(resp => {
                                res.writeHead(303, {"Location":"/tarefas"})
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                console.log(erro)
                                res.write("<p><a href="/">Voltar</a></p>")
                                res.end()
                            })
                        });
                    })
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                    res.end()
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " não suportado neste serviço.</p>")
                res.end()
        }   
    }
})

todoServer.listen(3015)
console.log('Servidor á escuta na porta 3015...')
console.log('http://localhost:3015')