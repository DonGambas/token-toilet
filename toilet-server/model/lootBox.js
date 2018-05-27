var mongoose = require('mongoose');  

var lootBoxSchema = new mongoose.Schema({  
	address: String,
    boxId: Number,
    prize: { contractAddress: String, value: Number },
    date: String,
});

var lootBoxModel = mongoose.model('LootBox', lootBoxSchema);

module.exports = lootBoxModel;

//Evento: boxId  -> bytes32
//        prizes -> array<prize>
//        prize -> [ contractAdress , value ]
//        address
//        fecha