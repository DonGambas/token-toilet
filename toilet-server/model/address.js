var mongoose = require('mongoose');  

var addressSchema = new mongoose.Schema({  
	address: String,
    name: String,
    type: Number,
});

var addressModel = mongoose.model('Address', addressSchema);

module.exports = addressModel;