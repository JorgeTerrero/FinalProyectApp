const mongoose = require('mongoose');
const {Schema} = mongoose;

const freightSchema = new Schema({

    code: {type: String , required: true},
    description: {type: String , required: true},
    type:{type: String , required: true},
    weight: {type: Number , required: true},
    status:{ type: Boolean , default: true},
});

module.exports = mongoose.model('Freights' , freightSchema);