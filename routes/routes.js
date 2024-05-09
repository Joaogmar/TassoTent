require('dotenv').config();
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const tentController = require('../controllers/tentController');

router.post('/admins', userController.createAdmin);
router.post('/login/admin', userController.adminLogin);
router.post('/login/tent', tentController.tentLogin);
router.get('/getAdminUsername', userController.getAdminUsername);
router.post('/logout', userController.logout);
router.post('/createTent', tentController.createTent);
router.delete('/removeTent', tentController.removeTent);
router.get('/totalTentCount', tentController.getTotalTentCount); 
router.get('/allTents', tentController.getAllTents);
router.put('/updateTentPassword', tentController.updateTentPassword);
router.put('/updateAllPasswords', tentController.updateAllPasswords);

module.exports = router;