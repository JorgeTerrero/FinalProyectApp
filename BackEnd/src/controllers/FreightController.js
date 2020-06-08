const freightModel = require('../models/Freight');
const _freight = {};

_freight.GetAllFreight = async (req, res) => {
    try {

        const freights = await freightModel.find({
            status: true
        });
        res.json({
            Ok: true,
            freights
        })

    } catch (err) {
        res.status(400).json({
            Ok: false,
            err
        });
    }
};

_freight.GetFreight = async (req, res) => {
    try {

        const id = req.params.id;
        const freight = await freightModel.findById(id);
        res.json({
            Ok: true,
            freight
        });

    } catch (err) {
        res.status(400).json({
            Ok: false,
            err
        });
    }
};

_freight.CreateFreight = async (req, res) => {
    try {

        const body = req.body;
        const freight = new freightModel({
            code: body.code,
            description: body.description,
            type: body.type,
            weight: body.weight,
        });

        await freight.save();

        res.json({
            Ok: true,
            message: 'La Carga Ha Sido Creada Correctamente'
        })

    } catch (err) {
        res.status(400).json({
            Ok: false,
            err
        });
    }
};

_freight.UpdateFreight = async (req, res) => {
    try {

        const id = req.params.id;
        const body = req.body;

        const freight = {

            code: body.code,
            description: body.description,
            type: body.type,
            weight: body.weight,
        };

        await freightModel.findByIdAndUpdate(id , freight , {new: true});

        res.json({
            Ok: true , 
            message: 'La Carga Ha Sido Modificada Correctamente'
        });

    } catch (err) {
        res.status(400).json({
            Ok: false,
            err
        });
    }
};

_freight.DeleteFreight = async (req, res) => {
    try {

        const _id = req.params.id;
        const body = req.body;
        body.status = false;
        await freightModel.findByIdAndUpdate(_id , body , {new: true});
         res.json({
               Ok: true,
               message:' La Carga Ha Sido Removida Correctamente'
         });
    } catch (err) {
        res.status(400).json({
            Ok: false,
            err
        });
    }
};

module.exports = _freight;