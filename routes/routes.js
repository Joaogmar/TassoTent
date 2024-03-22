require('dotenv').config();
const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controllers/userController');
const tentController = require('../controllers/tentController');

router.post('/users', createUser);
router.post('/login', loginUser);
router.post('/tents', tentController.createTent);

module.exports = router;
