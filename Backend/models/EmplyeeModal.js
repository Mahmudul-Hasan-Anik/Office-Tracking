const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmplyeeSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    office:{
        type: String,
        required: true
    },
    designation:{
        type: String,
        required: true
    },
    dayoff:{
        type: String,
        required: true
    }
})

const Emplyee = mongoose.model('emplyeeInfo', EmplyeeSchema)
module.exports = Emplyee