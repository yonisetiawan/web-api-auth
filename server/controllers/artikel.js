const modelsArtikel = require('../models/artikel');

var Artikels = {
  add: function(req, res, next) {
    var addArtikel = new modelsArtikel({
      title: req.body.title,
      isi: req.body.isi,
      author: req.body.author
    })
    addArtikel.save(function(err, result) {
        if(err){
          res.send(err)
        }else{
          res.send(result)
        }
    })
  },
  show: function(req, res, next) {
    modelsArtikel.find({},function(err, data) {
        res.send(data)
    })
  },
  delete: function(req, res, next) {
    var arrId = JSON.parse(req.body.arrId)
    arrId.forEach(function(idArtikel) {
      modelsArtikel.findByIdAndRemove(idArtikel, function(err) {
          if(err)res.send(err)
      })
    })
    res.send({
        status: "Data Terhapus"
    })
  },
  update: function(req, res, next) {
    modelsArtikel.findOneAndUpdate({
      _id: req.body.id
    },{
      title: req.body.title,
      isi: req.body.isi,
      author: req.body.author
    },{
      new: true
    }).then(function(err, result) {
        if(err)res.send(err)
        else {
          res.send(result)
        }
    })
  }
}

module.exports = Artikels
