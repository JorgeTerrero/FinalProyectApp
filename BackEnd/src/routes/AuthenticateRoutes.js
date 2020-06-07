const express = require('express');
const {Router} = express;
const router = Router();
const {UserLogin , UserLogout} = require('../controllers/LoginController');

router.post('/api/users/login' , UserLogin );
router.post('/api/users/logout' , UserLogout);

module.exports = router;