const containerModel = require('../models/Container');
const _container = {};

_container.GetAllContainer = async (req , res) =>{
    try {

        const containers = await containerModel.find({status: true});
        res.json({
            Ok: true,
            containers
        });

        
    } catch (err) {
        res.status(400).json({
            Ok: false,
            err
        });
    }
};

_container.GetContainer = async (req , res) =>{
    try {

        const id = req.params.id;
        const container = await containerModel.findById(id);
        res.json({
            Ok:true,
            container
        });
    } catch (err) {
        res.status(400).json({
            Ok: false,
            err
        });
    }
};

_container.CreateContainer = async (req , res) =>{
    try {

        const body = req.body;
        const container = new containerModel({
            type: body.type,
            payload: body.payload,
            capacity:body.capacity,
            lenght: body.lenght,
            width: body.width,
            height: body.height
        });

        await container.save();

        res.json({
            ok: true,
            message: 'El Contenedor Fue Creado Exitosamente'
        });

        
    } catch (err) {
        res.status(400).json({
            Ok: false,
            err
        });
    }
};

_container.UpdateContainer = async (req , res) =>{
    try {

        const _id = req.params.id;
        const body = req.body;
        const container = {
            type: body.type,
            payload: body.payload,
            capacity:body.capacity,
            lenght: body.lenght,
            width: body.width,
            height: body.height
        };

        await containerModel.findByIdAndUpdate(_id, container , {new: true});
        res.json({
            ok: true,
            message: 'El Contenedor Ha Sido Actualizado'
        });
        
    } catch (err) {
        res.status(400).json({
            Ok: false,
            err
        });
    }
};

_container.DeleteContainer = async (req , res) =>{
    try {

        const _id = req.params.id;
        const body = req.body;

        body.status = false;

        await containerModel.findByIdAndUpdate(_id , body ,{new: true});

        res.json({
            ok: true,
            message:'Container was Removed'
        });
        
    } catch (err) {
        res.status(400).json({
            Ok: false,
            err
        });
    }
};

module.exports = _container;