const express = require('express');
const {Router} = express;
const router = Router();
const {GetAllContainer , GetContainer , CreateContainer , UpdateContainer , DeleteContainer} = require('../controllers/ContainerController');

router.get('/api/container' , GetAllContainer);
router.get('/api/container/:id' , GetContainer);
router.post('/api/container' , CreateContainer);
router.put('/api/container/:id' , UpdateContainer);
router.delete('/api/container/:id' , DeleteContainer);

module.exports = router;