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
                        id: result[0].id,
                        name: result[0].name,
                        expiresIn: '1h'
                    }, "CODEuntukDECODE")
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

    decode: function(req, res, next) {
        jwt.verify(req.body.token, "CODEuntukDECODE", function(err, decoded) {
            if (err) {
              res.send(err.name)
                /*
                  err = {
                    name: 'TokenExpiredError',
                    message: 'jwt expired',
                    expiredAt: 1408621000
                  }
                */
            }else{
              res.send(decoded.name)
            }
        });
    },

    getAll: function(req, res, next) {
      modelsUsers.find({},function(err, result) {
        res.send(result)
      })
    }
}

module.exports = Users
