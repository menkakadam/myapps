var express = require('express');
var router = express.Router();
var empService = require('services/emps.service');

// routes
router.get('/', getAll);
router.post('/add', add);
router.post('/delete', Delete);
router.post('/update', update);

module.exports = router;

function getAll(req, res) {
    empService.getAll().then(function (emps) {
            res.send(emps);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function add(req, res) {
    console.log(req.body);
    empService.create(req.body)
        .then(function () {
            res.json('Added success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function Delete(req, res){
    empService.delete(req.body._id)
        .then(function () {
            res.json('Deleted success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    console.log(req.body);
    empService.update(req.body._id, req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
