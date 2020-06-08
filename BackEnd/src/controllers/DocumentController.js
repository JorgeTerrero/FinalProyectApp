const documentModel = require('../models/document');
const _document = {};
const path = require('path');
_document.GetDocuments = async (req , res) =>{
    try {
        const documents = await documentModel.find({status:true});
        res.json({
            ok: true,
            documents
        })
        
    } catch (err) {
        res.status(400).json({
            ok: false,
            err
        });
    }
};

_document.GetDocument = async (req , res)=>{
    try {

        const id = req.params.id;
        const document = await documentModel.findById(id);
        res.json({
            ok: true,
            document
        });
        
    } catch (err) {
        res.status(400).json({
            ok: false, 
            err
        });
    }
};

_document.CreateDocument = async (req , res)=>{
    try {

        const body = req.body;
        const arch = req.file;
        const document = new documentModel({
            title: body.title,
            description: body.description,
            image: arch.originalname
        });
        await document.save();
        res.json({
           ok: true,
           message: 'document was Saved Correctly'
        });
        
    } catch (err) {
        res.status(400).json({
            ok: false,
            err
        });
    }
};

_document.UpdateDocument = async (req , res) =>{
    try {

        const id = req.params.id;
        const body = req.body;
        const arch = req.file;

        const document = {
            title: body.title,
            description: body.description,
            image: arch.originalname
        };

        await documentModel.findByIdAndUpdate(id , document , {new: true});
        res.json({
            ok: true,
            message: 'Document was Updated Correctly'
        });
        
    } catch (err) {
        res.status(400).json({
            ok:false,
            err
        })
    }
};

_document.DeleteDocument = async (req , res)=>{
    try {

        const id = req.params.id;
        const body = req.body;
        body.status = false;

        await documentModel.findByIdAndUpdate(id , body , {new: true});
        res.json({
            ok: true,
            message: 'Document Was Removed'
        });
        
    } catch (err) {
        res.status(400).json({
            ok: true,
            err
        });
    }
};



module.exports = _document;