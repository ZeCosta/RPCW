const http = require('http');
const url = require('url');
const axios = require('axios');
const fs = require('fs')

page404=`<html>
    <head>
        <meta charset="UTF-8"/>
        <title>404</title>
        <link rel="stylesheet" href="https://w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <h1>404 File Not Found</h1>
    </body>
</html>`


function generateMainPage(){
    page=`<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Indice</title>
        <link rel="stylesheet" href="https://w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <h1>Bem vindo ao website da escola</h1>
        <a href="http://localhost:4000/alunos">Lista Alunos</a><br>
        <a href="http://localhost:4000/cursos">Lista Cursos</a><br>
        <a href="http://localhost:4000/instrumentos">Lista Instrumentos</a>
    </body>
</html>`
    return page
}

function generateAlunosPage(res){    
    axios.get('http://localhost:3000/alunos')
        .then(function (resp){
            res.write(`<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Alunos</title>
        <link rel="stylesheet" href="https://w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <a href="http://localhost:4000">Go to main page</a>
        <h1>Página de Alunos:</h1>
        <table>
            <tr>
                <th>id</th>
                <th>nome</th>
                <th>dataNasc</th>
                <th>curso</th>
                <th>anoCurso</th>
                <th>instrumento</th>
            </tr>`)

            alunos = resp.data;
            //console.log(resp.data)
            alunos.forEach(p => {
                //console.log(`${p.year}, ${p.id}, ${p.title}`);
                res.write(`<tr>
                    <td><a href="http://localhost:4000/alunos/${p.id}">${p.id}</a></td>
                    <td><a href="http://localhost:4000/alunos/${p.id}">${p.nome}</a></td>
                    <td>${p.dataNasc}</td>
                    <td><a href="http://localhost:4000/cursos/${p.curso}">${p.curso}</a></td>
                    <td>${p.anoCurso}</td>
                    <td>${p.instrumento}</td>
                </tr>`)
                //console.log(p.year+"::"+p.id+"::"+p.title);
            });
            res.write(`
            </table>
        </body>
    </html>`)
            res.end();
        })
        .catch(function (error){
            console.log(error);
            res.write(`<html>
            <head>
                <meta charset="UTF-8"/>
                <title>Indice</title>
                <link rel="stylesheet" href="https://w3schools.com/w3css/4/w3.css">
            </head>
            <body>
                <h1>Erro</h1>
            </body>
        </html>`)
            res.end()
    });
}

function generateCursosPage(res){  
    axios.get('http://localhost:3000/cursos')
        .then(function (resp){
            res.write(`<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Cursos</title>
        <link rel="stylesheet" href="https://w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <a href="http://localhost:4000">Go to main page</a>
        <h1>Página de Cursos:</h1>
        <table>
            <tr>
                <th>id</th>
                <th>designacao</th>
                <th>duracao</th>
                <th>instrumento</th>
            </tr>`)

            cursos = resp.data;
            //console.log(cursos)
            cursos.forEach(p => {
                //console.log(`${p.year}, ${p.id}, ${p.title}`);
                res.write(`<tr>
                    <td><a href="http://localhost:4000/cursos/${p.id}">${p.id}</a></td>
                    <td><a href="http://localhost:4000/cursos/${p.id}">${p.designacao}</a></td>
                    <td>${p.duracao}</td>
                    <td>${p.instrumento.id} - ${p.instrumento.text}</td>
                </tr>`)
                //console.log(p.year+"::"+p.id+"::"+p.title);
            });
            res.write(`
            </table>
        </body>
    </html>`)
            res.end();
        })
        .catch(function (error){
            console.log(error);
            res.write(`<html>
            <head>
                <meta charset="UTF-8"/>
                <title>Indice</title>
                <link rel="stylesheet" href="https://w3schools.com/w3css/4/w3.css">
            </head>
            <body>
                <h1>Erro</h1>
            </body>
        </html>`)
            res.end()
    });
}

function generateInstrumentosPage(res){  
    axios.get('http://localhost:3000/instrumentos')
        .then(function (resp){
            res.write(`<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Instrumentos</title>
        <link rel="stylesheet" href="https://w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <a href="http://localhost:4000">Go to main page</a>
        <h1>Página de Cursos:</h1>
        <table>
            <tr>
                <th>id</th>
                <th>text</th>
            </tr>`)

            instrumentos = resp.data;
            //console.log(cursos)
            instrumentos.forEach(p => {
                //console.log(`${p.year}, ${p.id}, ${p.title}`);
                res.write(`<tr>
                    <td>${p.id}</td>
                    <td>${p.text}</td>
                </tr>`)
                //console.log(p.year+"::"+p.id+"::"+p.title);
            });
            res.write(`
            </table>
        </body>
    </html>`)
            res.end();
        })
        .catch(function (error){
            console.log(error);
            res.write(`<html>
            <head>
                <meta charset="UTF-8"/>
                <title>Instrumentos</title>
                <link rel="stylesheet" href="https://w3schools.com/w3css/4/w3.css">
            </head>
            <body>
                <h1>Erro</h1>
            </body>
        </html>`)
            res.end()
    });
}

function generateAlunoPage(res,aluno){
    axios.get('http://localhost:3000/alunos/'+aluno)
        .then(function (resp){
            res.write(`<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Aluno ${aluno}</title>
        <link rel="stylesheet" href="https://w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <a href="http://localhost:4000/alunos">Go to alunos</a>
        <h1>Página do Aluno:</h1>
        <table>
            <tr>
                <th>id</th>
                <th>nome</th>
                <th>dataNasc</th>
                <th>curso</th>
                <th>anoCurso</th>
                <th>instrumento</th>
            </tr>`)

            
            aluno = resp.data;
            //console.log(aluno)
            res.write(`<tr>
                    <td>${aluno.id}</td>
                    <td>${aluno.nome}</td>
                    <td>${aluno.dataNasc}</td>
                    <td><a href="http://localhost:4000/cursos/${alunos.curso}">${aluno.curso}</td>
                    <td>${aluno.anoCurso}</td>
                    <td>${aluno.instrumento}</td>
                </tr>`)

            res.write(`
            </table>
        </body>
    </html>`)
            res.end();
        })
        .catch(function (error){
            console.log(error);
            res.write(`<html>
            <head>
                <meta charset="UTF-8"/>
                <title>Aluno ${aluno}</title>
                <link rel="stylesheet" href="https://w3schools.com/w3css/4/w3.css">
            </head>
            <body>
                <h1>Erro</h1>
            </body>
        </html>`)
            res.end()
    });
}

function generateCursoPage(res,curso){
    axios.get('http://localhost:3000/cursos/'+curso)
        .then(function (resp){
            res.write(`<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Curso ${curso}</title>
        <link rel="stylesheet" href="https://w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <a href="http://localhost:4000/cursos">Go to cursos</a>
        <h1>Página do Curso:</h1>
        <table>
            <tr>
                <th>id</th>
                <th>designacao</th>
                <th>duracao</th>
                <th>instrumento</th>
            </tr>`)

            
            curso = resp.data;
            //console.log(curso)
            res.write(`<tr>
                    <td>${curso.id}</td>
                    <td>${curso.designacao}</td>
                    <td>${curso.duracao}</td>
                    <td>${curso.instrumento.id} - ${curso.instrumento.text}</td>
                </tr>`)

            res.write(`
            </table>
        </body>
    </html>`)
            res.end();
        })
        .catch(function (error){
            console.log(error);
            res.write(`<html>
            <head>
                <meta charset="UTF-8"/>
                <title>Aluno ${aluno}</title>
                <link rel="stylesheet" href="https://w3schools.com/w3css/4/w3.css">
            </head>
            <body>
                <h1>Erro</h1>
            </body>
        </html>`)
            res.end()
    });
}


myserver = http.createServer(function (req,res){
    console.log(req.method + " " + req.url)
    var myurl = url.parse(req.url,true).pathname
    
    file=myurl.substring(1)
    arrStrings=myurl.split("/")
    console.log(arrStrings)

    query=""

    if(myurl == "/"){   //main page
        console.log("Main Page")
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});                    
        res.write(generateMainPage());
        res.end();
    }else{
        if(arrStrings[1]=="alunos"){
            if(arrStrings.length==2){
                console.log("Get table alunos")
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                generateAlunosPage(res);
            }else{
                //file=arrStrings[1]+"/"+arrStrings[2]+".html"
                //get specific aluno
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                generateAlunoPage(res,arrStrings[2])
            }
        }
        else{
            if(arrStrings[1]=="cursos"){
                if(arrStrings.length==2){
                    console.log("Get table cursos")
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    generateCursosPage(res)
                    
                }else{
                    //file=arrStrings[1]+"/"+arrStrings[2]+".html"
                    //get specific curso
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    generateCursoPage(res,arrStrings[2])
                }
            }
            else{
                if(arrStrings[1]=="instrumentos"){
                    //Lista de instrumentos
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    generateInstrumentosPage(res)
                }
                else{
                    /*
                    //Get file (e.g. W3Schools.css or favicon.ico)
                    file=arrStrings[1]
                    console.log("getting: "+ file)
                    fs.readFile(file, function(err, data){
                        if(err){
                            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write("<h1>Erro na leitura do ficheiro...</h1>");
                            console.log("Error")
                        }else{
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(data);
                            console.log("FileFound")
                        }
                        res.end();
                    })*/
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});      
                    res.write(page404)
                    res.end
                }
            }    
        }
    }

    console.log("\n")
})

myserver.listen(4000);
console.log('Servidor à escuta na porta 4000 (http://localhost:4000)');
console.log('http://localhost:4000');