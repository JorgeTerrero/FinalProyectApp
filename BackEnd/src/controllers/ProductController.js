const productModel = require('../models/Product');
const _product = {};

_product.GetAllProducts = async (req , res) =>{
    try {

        const product = await productModel.find();
        res.json({
            ok: true,
            product
        });
        
    } catch (err) {
        res.status(400).json({
            ok: false ,
            err
        });
    }
};

_product.GetProduct = async (req , res) =>{
    try {
        const id = req.params.id;
        const product = await productModel.findById(id);
        res.json(product);
        
    } catch (err) {
        res.status(400).json({
            ok: false ,
            err
        });
    }
}


_product.CreateProduct = async (req , res) =>{
    try {
        const body = req.body;
        const product = new productModel({
            name:body.name,
            description:body.description,
            category:body.category,
        });

        await product.save();
        res.json({
            ok: true,
            message: 'Product was Created'
        });
        
    } catch (err) {
        res.status(400).json({
            ok: false ,
            err
        });
    }
};

_product.UpdateProduct = async (req , res) =>{
    try {
        const _id = req.params.id;
        const body = req.body;
        
        const product = {
            name:body.name,
            description:body.description,
            category:body.category,
        };

        await productModel.findByIdAndUpdate(_id , product , {new: true});

        res.json({
            ok: true,
            message: 'Product Was Updated'
        });
        
    } catch (err) {
        res.status(400).json({
            ok: false ,
            err
        });
    }
};

_product.DeleteProduct = async (req , res) =>{
    try {

        const _id = req.params.id;
        const body = req.body;
        body.status = false;

        await productModel.findByIdAndUpdate(_id , body , {new: true});
        res.json({
            ok: true,
            message: 'Product Was Deleted'
        });
        
    } catch (err) {
        res.status(400).json({
            ok: false ,
            err
        });
    }
};

module.exports = _product;