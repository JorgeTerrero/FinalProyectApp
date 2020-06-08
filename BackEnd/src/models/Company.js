const mongoose = require('mongoose');
const {Schema} = mongoose;

const companySchema = new Schema({
     name:{type: String , required: true},
     code:{type:String , required: true},
     adress:{type:String , required: true},
     phone:{type: String , required: true},
     status: {type: Boolean , default: true}
});

module.exports = mongoose.model('Company' , companySchema);