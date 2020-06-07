const express = require('express');
const {Router} = express;
const router = Router();
const {GetAllUsers , GetUser , CreateUser , UpdateUser , DeleteUser} = require('../controllers/usersController');

router.get('/api/users' , GetAllUsers);
router.get('/api/users/:id' , GetUser);
router.post('/api/users' , CreateUser);
router.put('/api/users/:id' , UpdateUser);
router.delete('/api/users/:id' , DeleteUser);

module.exports = router;