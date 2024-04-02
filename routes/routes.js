require('dotenv').config();
const express = require('express');
const router = express.Router();
const { createAdmin , loginUser } = require('../controllers/userController');
const tentController = require('../controllers/tentController');

router.post('/admins', createAdmin);
router.post('/login', loginUser);
router.post('/createTent', tentController.createTent);
router.delete('/removeTent', tentController.removeTent);
router.get('/totalTentCount', tentController.getTotalTentCount); 
router.get('/allTents', tentController.getAllTents);
router.put('/updateTentPassword', tentController.updateTentPassword);
router.put('/updateAllPasswords', tentController.updateAllPasswords);

module.exports = router;