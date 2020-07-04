const mongoose = require('mongoose');
const {Schema} = mongoose;
const freight = require('./DtoFreight');

const container = new Schema({
    containerId: {type: Schema.Types.ObjectId , required: true},
    companyId:{type:Schema.Types.ObjectId , required: true},
    process: {type: String , required: true},
    check: {type:Boolean , default: false},
    status:{type: Boolean , default: true},
    charge:[freight],
});

module.exports = container;