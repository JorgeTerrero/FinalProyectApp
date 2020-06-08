const express = require('express');
const {Router} = express;
const router = Router();

const {GetAllCompanies , GetCompany , CreateCompany , UpdateCompany , DeleteCompany} = require('../controllers/CompanyController');

router.get('/api/company' , GetAllCompanies);
router.get('/api/company/:id' , GetCompany);
router.post('/api/company' , CreateCompany);
router.put('/api/company/:id' , UpdateCompany);
router.delete('/api/company/:id' , DeleteCompany);

module.exports = router;