const usersModel = require('../models/Users');
const _user = {};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

_user.GetAllUsers = async (req , res) =>{
    try {

        const user  = await usersModel.find({status:true});
        res.json({
            Ok: true,
            users: user
        });
        
    } catch (err) {
        res.status(400).json({
            Ok: false , 
            err
        });
    }
};

_user.GetUser = async (req , res) =>{
    try {
        const id = req.params.id;
        const user = await usersModel.findById(id);
        res.json({
            OK: true,
            user
        })
        
    } catch (err) {
        res.status(400).json({
            Ok: false , 
            err
        });
    }
};

_user.CreateUser = async (req , res) =>{
    try {

        const body  = req.body;

        //bcrypt the password
        const passwordSalt  = await bcrypt.hashSync(body.passwordHalt , 10);

        //set jwt 
        const token = jwt.sign({role: body.role} , 'PopApp' , {expiresIn: '30d'});

        const user = new usersModel({
            username: body.username,
            email:  body.email,
            passwordHalt: body.passwordHalt,
            passwordSalt: passwordSalt,
            role:body.role,
            token: token
        });

        //save on mongoDB
        await user.save();

        res.json({
            Ok: true,
            message: 'User Was Created Successfully'
        });
        
    } catch (err) {
        res.status(400).json({
            Ok: false , 
            err
        });
    }
};

_user.UpdateUser = async (req , res) =>{
    try {

        const id = req.params.id;
        const body = req.body;
        const user = await usersModel.findById(id);
        const match = bcrypt.compareSync(body.passwordHalt , user.passwordSalt);
        const jwtMatch = jwt.verify(user.token , 'PopApp');

        if(match && jwtMatch){

            const passwordSalt = await bcrypt.hashSync(body.passwordHalt , 10);
            const token = jwt.sign({role: body.role} , 'PopApp' , {expiresIn: '30d'});

            const _newUser = {
                 username: body.username,
                 email: body.email,
                 passwordHalt: body.passwordHalt,
                 passwordSalt: passwordSalt,
                 role: body.role,
                 token: token
            };

            await usersModel.findByIdAndUpdate(id , _newUser , {new: true});

            return res.json({
                  OK: true,
                  message: 'User Was Updated Successfully'
            });

        }
        
    } catch (err) {
        res.status(400).json({
            Ok: false , 
            err
        });
    }
};

_user.DeleteUser = async (req , res) =>{
    try {

        const id = req.params.id;
        const body = req.body;

        body.status = false;

        await usersModel.findByIdAndUpdate(id , body , {new: true});

        res.json({
            Ok: true,
            message: 'User was Delete Successfully'
        });
        
    } catch (err) {
        res.status(400).json({
            Ok: false , 
            err
        });
    }
};


module.exports = _user;