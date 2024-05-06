const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    gender: String,

    consultation : {
        type: String,
        required: true
    },

    imagei: String, 
    imageo: String,
    aipres: String
    
    
});

const Userdb = mongoose.model('tech_patient_data', schema);

module.exports = Userdb;

