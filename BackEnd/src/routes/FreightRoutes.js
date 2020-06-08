const express = require('express');
const {Router} = express;
const router = Router();
const {GetAllFreight , GetFreight , CreateFreight , UpdateFreight , DeleteFreight} = require('../controllers/FreightController');

router.get('/api/freight' , GetAllFreight);
router.get('/api/freight/:id' , GetFreight);
router.post('/api/freight' , CreateFreight);
router.put('/api/freight/:id' , UpdateFreight);
router.delete('/api/freight/:id' , DeleteFreight);

module.exports = router;