var express = require('express');
var router = express.Router();
var Para = require("../controllers/para.js")

/* GET home page. */
router.get('/paras', function(req, res, next) {
  Para.listar()
    .then( data => res.status(200).jsonp(data))
    .catch( error => {
      console.log(error)
      res.status(501).jsonp({error: error})
    })
});

router.post("/paras", function(req, res, next){
  Para.inserir(req.body)
    .then( data => res.status(200).jsonp(data))
    .catch( error => {
      console.log(error)
      res.status(502).jsonp({error: error})
    })
});

module.exports = router;
