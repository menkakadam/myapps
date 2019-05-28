var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

var service = {};

service.authenticate = authenticate;
service.create = create;
service.getAll = getAll;

module.exports = service;

function authenticate(username, password, isPanel) {
    var deferred = Q.defer();
    db.users.findOne({ username: username }, function (err, user) {
      if(user == null){
        deferred.reject("Incorrect username");
      }
      else {
        if (err) deferred.reject(err.name + ': ' + err.message);
        if (user.password === password) {
          // if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            // console.log(isPanel);
            // console.log(user.isPanel);
            // if (isPanel == user.isPanel) {
                deferred.resolve({
                    _id: user._id,
                    username: user.username,
                    // FName: user.FName,
                    // LName: user.LName,
                    // isPanel: user.isPanel,
                    // isAdmin: user.isAdmin,
                    // teamName: user.teamName,
                    // panelType: user.panelType,
                    // PMEmail:user.PMEmail,
                    // POCEmail:user.POCEmail,
                    // DAMEmail:user.DAMEmail,
                    // token: jwt.sign({ sub: user._id }, config.secret)
                });
            // }
            // else {
            //     deferred.reject("Incorrect role, please provide the valid credentials");
            // }
        } else {
            // authentication failed
            deferred.resolve();
        }
      }
    });
    return deferred.promise;
}

function getAll() {
  var deferred = Q.defer();

  db.users.find().toArray(function (err, users) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      // return users (without hashed passwords)
      users = _.map(users, function (user) {
          return _.omit(user, 'hash');
      });

      deferred.resolve(users);
  });

  return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();
    // validation
    db.users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');
        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);
        db.users.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}


