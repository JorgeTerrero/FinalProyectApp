const mongoose = require('mongoose');
const {Schema} = mongoose;

const VesselSchema = new Schema({
    name: { type: String , required: true},
    code: {type: String , required: true},
    imo: {type: String , required: true},
    flag: {type: String , required: true},
    slora: {type: String , required: false},
    arrival: {type: String , required: false},
    status: {type: Boolean , default: true}
});

module.exports = mongoose.model('Vessel', VesselSchema);