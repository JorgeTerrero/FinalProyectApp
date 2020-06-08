const express = require('express');
const {Router} = express;
const router = Router();
const {GetExcelData , PushExcelData , DownloadExcelFile} = require('../controllers/ExcelController');

router.post('/api/excel' , GetExcelData); 
router.post('/api/excel/push' , PushExcelData)
router.get('/api/excel/download' , DownloadExcelFile);

module.exports = router;