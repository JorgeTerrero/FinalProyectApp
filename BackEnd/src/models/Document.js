const mongoose= require('mongoose');
const {Schema} = mongoose;

const documentSchema = new Schema({
    title: {type: String , required: true},
    description:{type: String , required: true},
    image:{type: String , required: true},
    status:{type: Boolean , default: true}
});

module.exports = mongoose.model('Documents' , documentSchema);