var express = require('express');
var router = express.Router();
var fs = require('fs')

var multer  =require('multer');              //middleware for handling multipart/form-data (e.g. ficheiros no POST) -> https://www.npmjs.com/package/multer
var upload = multer({dest: 'uploads'})      //pasta de destino

var File = require('../controllers/file')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/files");
  //res.render('index', { title: 'Express' });
});

router.get('/files', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)                    //date
  
  File.list()
    .then(data => {
      //console.log(data)
      res.render('files', {d: d, title:"FileServer", list: data})
    })
    .catch(error => res.render('error',{error: error}))
});


//Passar type -> se image then tag img, etc
//adicionar botão para download (talvez tbm na página principal)
router.get('/files/see/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0,16)                    //date
  id = req.params.id
  //_id
  File.lookUp(id)
    .then(file => {
      res.render('file', {d: d, title:"FileServer File", f: file})
    })
    .catch(error => res.render('error',{error: error}))
});



router.get('/files/del/:id', function(req, res, next) {
  id = req.params.id
  //_id
  
  File.lookUp(id)
    .then(file => {
      let path = process.cwd() + '/public/fileStore/' + file.name
      
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err)
          return
        }
        
        File.delete(id)
          .then(() => {
            res.redirect("/files")
          })
          .catch(error => res.render('error',{error: error}))
      })
    })
    .catch(error => res.render('error',{error: error}))
});


router.post('/files', upload.single('myFile'), (req,res) => {
  let oldPath = process.cwd() + '/' + req.file.path
  let newPath = process.cwd() + '/public/fileStore/' + req.file.originalname
  //console.log(__dirname)
  //console.log(process.cwd())
  fs.rename(oldPath,newPath, erro => {
    if(erro) throw erro
  })
  
  var d = new Date().toISOString().substring(0,16)                    //date

  var file = {
    date:d,
    name: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    description: req.body.description
  }

  File.insert(file)
    .then(()=>res.redirect("/files"))
    .catch(error => res.render('error',{error: error}))
})


module.exports = router
