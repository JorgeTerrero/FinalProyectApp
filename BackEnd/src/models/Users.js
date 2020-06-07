const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({

    username: {type: String , required: true},
    email: {type: String , required: true},
    passwordHalt: {type: String , required:true},
    passwordSalt: {type: String},
    role:{type: String , required: true},
    token: {type: String , required: true},
    status:{type: Boolean , default: true}

});

module.exports = mongoose.model('Users' , userSchema);