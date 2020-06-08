const vesselModel = require('../models/Vessel');
const _vessel = {};


_vessel.GetAllVessels = async (req, res) => {
    try {

        const vessel = await vesselModel.find();
        res.json({
            ok: true,
            vessel
        })

    } catch (err) {
        res.status(400).json({
            ok: false,
            err
        });
    }
}

_vessel.GetVessel = async (req, res) => {

    try {
        const id = req.params.id;

        const vessel = await vesselModel.findById(id);

        res.json({
            Ok: true,
            vessel
        });

    } catch (err) {
        res.status(400).json({
            Ok: false,
            err
        });
    }
};

_vessel.CreateVessel = async (req, res) => {

    try {
        const body = req.body;

        const vessel = new vesselModel({
            name: body.name,
            code: body.code,
            imo: body.imo,
            flag: body.flag,
            slora: body.slora,
            arrival: body.arrival
        });

        await vessel.save();

        res.json({
            Ok: true,
            message: 'Buque Creado Correctamente'
        });

    } catch (err) {
        res.status(400).json({
            Ok: false,
            err
        });
    }
};

_vessel.UpdateVessel = async (req, res) => {
    try {

        let body = req.body;
        let _id = req.params.id;

        const vessel = {

            name: body.name,
            code: body.code,
            imo: body.imo,
            flag: body.flag,
            slora: body.slora,
            arrival: body.arrival

        };

        await vesselModel.findByIdAndUpdate(_id, vessel, {
            new: true
        });

        res.json({
            ok: true,
            message: 'Buque Fue Modificado Correctamente'
        });

    } catch (err) {
        res.status(400).json({
            Ok: false,
            err
        });
    }
};

_vessel.DeleteVessel = async (req , res) =>{

    try {

        let body = req.body;
        let _id = req.params.id;

        body.status = false;

        await vesselModel.findByIdAndUpdate(_id , body , {new: true});

        res.json({
            ok: true ,
            message: 'Buque Fue Eliminado Correctamente'
        });
        
        
    } catch (err) {
        res.status(400).json({
            Ok:false,
            err
        });
    }

};

module.exports = _vessel;
