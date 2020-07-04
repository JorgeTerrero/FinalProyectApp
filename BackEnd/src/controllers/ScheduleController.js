const scheduleModel = require('../models/Schedule');
const Schedule = require('../models/Schedule');
const _schedule ={};

_schedule.GetSchedules = async (req , res)=>{

    try {

        const schedule = await scheduleModel.find({status: true});
        res.json({
            ok: true,
            schedule
        });
        
    } catch (err) {
        res.status(400).json({
            ok: false,
            err
        });
    }

};

_schedule.GetSchedule = async (req , res)=>{

    try {
        const id = req.params.id;
        const schedule = await scheduleModel.findById(id);
        res.json({
            ok:true,
            schedule
        });
        
    } catch (err) {
        res.status(400).json({
            ok: false,
            err
        });
    }

};

_schedule.CreateSchedule = async (req , res)=>{

    try {

        const body = req.body;
        const schedule = new scheduleModel({
                buqueId: body.buqueId,
                date: body.date,
                containers: body.containers,
        });

        await schedule.save();

        res.json({
            ok: true,
            message: "Schedule Was Created"
        });

        
    } catch (err) {
        res.status(400).json({
            ok: false,
            err
        });
    }

};

_schedule.UpdateSchedule = async (req , res)=>{

    try {
        const id = req.params.id;
        const body = req.body;
        const schedule = {
            buqueId: body.buqueId,
            date: body.date,
            containers: body.containers,
    };

    await scheduleModel.findByIdAndUpdate(id , schedule , {new: true});
    res.json({
        ok: true,
        message: "Schedule Was Updated"
    });

        
    } catch (err) {
        res.status(400).json({
            ok: false,
            err
        });
    }

};

_schedule.DeleteSchedule = async (req , res)=>{

    try {
        const id = req.params.id;
        const body = req.body;
        body.status = false;
        await scheduleModel.findByIdAndUpdate(id , body , {new: true});
        res.json({
            ok: true,
            message: "Schedule Was Deleted"
        });
        
    } catch (err) {
        res.status(400).json({
            ok: false,
            err
        });
    }

};


module.exports = _schedule;