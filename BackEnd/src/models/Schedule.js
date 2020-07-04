const mongoose = require('mongoose');
const {Schema} = mongoose;
const containers = require('./DtoModels/DtoContainer');

const scheduleSchema = new Schema({
    buqueId: {type: Schema.Types.ObjectId , required: true},
    date:{type: String , required: true},
    containers:[containers],
    status:{type: Boolean , default: true}
});

module.exports = mongoose.model('Schedules' , scheduleSchema);