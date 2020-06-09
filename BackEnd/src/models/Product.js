const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({

    name:{type:String , required: true},
    description:{type: String , required: true},
    category:{type: String , required:true},
    status:{type:String , default: true}

});

module.exports = mongoose.model('Products' , productSchema);