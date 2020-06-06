var express = require('express');
var router = express.Router();
const response = require('../../utils/response');

//Get to Home Page
var controller = require('./controller');

router
.get('/getAllUsers', (req, res) => {
    controller.getUsers(req, (err, data) => {
        err ? response.send_error_json(res, err) : response.send_response_json(res, data);
    });
})

router
.post('/add', (req, res) => {
    controller.addUser(req, (err, data) => {
        err ? response.send_error_json(res, err) : response.send_response_json(res, data);
    });
})
.post('/getUserByMobile', (req, res) => {
    controller.getUserByMobile(req, (err, data) => {
        err ? response.send_error_json(res, err) : response.send_response_json(res, data);
    });
})

router.stack.forEach(function(r){
    if (r.route && r.route.path){
      console.log(r.route.path)
    }
});

module.exports = router;
