const mongoose = require('mongoose');
const {Schema} = mongoose;
const product = require('./DtoProduct');

const freight = new Schema({
    freightId: {type:Schema.Types.ObjectId , required: true},
    products: [products],
    status: {type: Boolean , default: true}
});

module.exports = freight;