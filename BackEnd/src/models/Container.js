const mongoose = require('mongoose');
const {Schema} = mongoose;

const containerModel = new Schema({
    type: {type:String , required: true},
    payload: {type:Number , required: true},
    capacity:{type: Number , required: true},
    lenght:{type:Number , required:true},
    width:{type:Number , required:true},
    height:{type: Number , required:true},
    status: {type: Boolean , default: true}
});

module.exports = mongoose.model('Containers' , containerModel);