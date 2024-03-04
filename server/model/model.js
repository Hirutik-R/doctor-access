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

    imagei: String, // Path to input image
    imageo: String // Path to output image
    
    
});

const Userdb = mongoose.model('tech_patient_data', schema);

module.exports = Userdb;

