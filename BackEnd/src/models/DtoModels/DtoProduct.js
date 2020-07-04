const mongoose = require('mongoose');
const {Schema} = mongoose;

const products = new Schema({
    productId: {type: Schema.Types.ObjectId , required: true},
    quantity: {type: Number , required: true},
    status: {type: Boolean , default: true}
});

module.exports = products;