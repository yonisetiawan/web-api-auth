const modelsUsers = require('../models/users')
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');


var DataUsers = {

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
    }
}

module.exports = DataUsers
