var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('emps');

var service = {};
service.getAll = getAll;
service.create = create;
service.delete = Delete;
service.update = update;
module.exports = service;

function getAll() {
    var deferred = Q.defer();
    db.emps.find().toArray(function (err, emps) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        emps = _.map(emps, function (emp) {
            return _.omit(emp, 'hash');
        });
        deferred.resolve(emps);
    });
    return deferred.promise;
}

function create(empParam) {
    var deferred = Q.defer();

    db.emps.findOne(
        { EName: empParam.EName },
        function (err, emp) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            if (emp) {
                // username already exists
                deferred.reject('Employee "' + empParam.EName + '" is already taken');
            } else {
                createEmps();
            }
        });

    function createEmps() {
        var emp = _.omit(empParam);
        db.emps.insert(emp,
            function (err) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                deferred.resolve();
            });
    }
    return deferred.promise;
}

function Delete(_id) {
    var deferred = Q.defer();
    db.emps.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            deferred.resolve();
        });
    return deferred.promise;
}


function update(_id, userParam) {
    console.log(userParam);
    var deferred = Q.defer();
    var set = {
        EName: userParam.EName,
        Salary: userParam.Salary,
    };
    db.emps.update(
        { _id: mongo.helper.toObjectID(_id) },
        { $set: set },
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            deferred.resolve();
        });
    return deferred.promise;
}
