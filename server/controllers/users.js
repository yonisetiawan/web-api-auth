const modelsUsers = require('../models/users')
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');


var Users = {
    login: function(req, res, next) {
        modelsUsers.find({
            email: req.body.email
        }).then(function(result) {
            if (result) {
                if (passwordHash.verify(req.body.password, result[0].password)) {
                    var token = jwt.sign({
                        id: result.id,
                        expiresIn: '1h'
                    }, "Code Decode Mohon Dipindah ke Config / .env")
                    res.send({
                      token: token
                    })
                } else {
                    res.send("Password incorrect")

                }
            } else {
                res.send("User Belum Terdaftar")
            }

        })


    },
    register: function(req, res, next) {
        var register = new modelsUsers({
            name: req.body.name,
            email: req.body.email,
            password: passwordHash.generate(req.body.password)
        })
        register.save(function(err, result) {
            if (err) {
                res.send(err)
            } else {
                res.send(result)
            }
        })
    },
    delete: function(req, res, next) {
      modelsUsers.find({
        email:req.body.email
      },function(err, result) {
        if(err){
          res.send(err)
        }else{
          result[0].remove(function(err) {
            if(err){
              res.send(err)
            }else{
              res.send({
                status:"Data Terhapus"
              })
            }
          })
          
        }
      })
    }
}

module.exports = Users
