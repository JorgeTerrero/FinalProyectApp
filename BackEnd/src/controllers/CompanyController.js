const companyModel = require('../models/company');
const _company = {};

_company.GetAllCompanies = async (req , res) =>{

    try {

        const company = await companyModel.find({status: true});
        res.json({
            ok: true,
            company
        });
        
    } catch (err) {
        res.status(400).json({
            ok: false,
            err
        });
    }

};

_company.GetCompany= async (req , res) =>{

    try {
        const code = req.params.id;
        const company = await companyModel.findById(id);
        res.json({
            ok: true,
            company
        });
        
    } catch (err) {
        res.status(400).json({
            ok: false,
            err
        });
    }

};

_company.CreateCompany = async (req , res) =>{

    try {

        const body = req.body;
        const company = new companyModel({
            name: body.name,
            code:body.code,
            adress:body.adress,
            phone:body.phone
        });

        await company.save();
        res.json({
            ok: true,
            message: 'Company fue Creada Correctamente'
        });
        
    } catch (err) {
        res.status(400).json({
            ok: false,
            err
        });
    }

};

_company.UpdateCompany = async (req , res) =>{

    try {

        const _id = req.params.id;
        const body = req.body;
        const company = {
            name: body.name,
            code:body.code,
            adress:body.adress,
            phone:body.phone
        };

        await companyModel.findByIdAndUpdate(_id ,company , {new: true});

        res.json({
            ok: true,
            message: 'Company Fue Actualizada Correctamente'
        });
        
    } catch (err) {
        res.status(400).json({
            ok: false,
            err
        });
    }

};

_company.DeleteCompany = async (req , res) =>{

    try {
        const _id = req.params.id;
        const body = req.body;
        body.status = false;
        await companyModel.findByIdAndUpdate(_id , body , {new: true});
        res.json({
            ok: true,
            message: 'Company Fue Eliminada Correctamente'
        });
        
    } catch (err) {
        res.status(400).json({
            ok: false,
            err
        });
    }

};

module.exports = _company;