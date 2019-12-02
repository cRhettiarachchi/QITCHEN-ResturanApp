const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');


// post method to add a new user
router.post('/sign-up', usersController.createUser); // end of the method

router.post('/login', usersController.loginUser);


module.exports = router;
