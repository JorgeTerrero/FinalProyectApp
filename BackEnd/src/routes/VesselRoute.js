const express = require('express');
const {Router} = express;
const router = Router();
const {GetAllVessels , GetVessel , CreateVessel , UpdateVessel , DeleteVessel} = require('../controllers/VesselController');


router.get('/api/vessel' , GetAllVessels);
router.post('/api/vessel' , CreateVessel);
router.get('/api/veseel/:id' , GetVessel);
router.put('/api/vessel/:id' , UpdateVessel);
router.delete('/api/vessel/:id', DeleteVessel);


module.exports = router;