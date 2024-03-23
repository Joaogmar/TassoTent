require('dotenv').config();
const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controllers/userController');
const tentController = require('../controllers/tentController');

router.post('/users', createUser);
router.post('/login', loginUser);
router.post('/createTent', tentController.createTent);
router.delete('/deleteTent', tentController.deleteTent);
router.get('/totalTentCount', tentController.getTotalTentCount);
router.get('/allTents', tentController.getAllTents);
router.put('/updatePassword/:key', tentController.updatePassword);
router.put('/updateAllPasswords', tentController.updateAllPasswords);


module.exports = router;