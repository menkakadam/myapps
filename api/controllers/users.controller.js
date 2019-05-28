var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');
// var utililtiesServiceObject = require('services/utililties.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
module.exports = router;

function getAll(req, res) {
  userService.getAll()
      .then(function (users) {
          res.send(users);
      })
      .catch(function (err) {
          res.status(400).send(err);
      });
}

function authenticate(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function (user) {
            if (user) {
                console.log(user);
                res.send(user);
            } else {
                res.status(400).send('Username or password is incorrect');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function register(req, res) {
    userService.create(req.body)
        .then(function () {
            res.json('User register successfully');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

