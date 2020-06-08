const express = require('express');
const {Router} = express;
const multer = require('multer');
const path = require('path');
const upload = multer({
    dest: path.resolve(__dirname , '../public/upload')
});

const { GetDocuments , GetDocument , CreateDocument , UpdateDocument , DeleteDocument} = require('../controllers/documentController');
const router = Router();

router.get('/api/document' , GetDocuments);
router.get('/api/document/:id', GetDocument);
router.post('/api/document' , upload.single('arch'), CreateDocument);
router.put('/api/document/:id' , upload.single('arch'), UpdateDocument);
router.delete('/api/document/:id' , DeleteDocument);

module.exports = router;