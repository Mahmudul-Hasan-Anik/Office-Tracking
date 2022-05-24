const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Auth = require('./authModals')

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
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Auth'
    }
})

const Emplyee = mongoose.model('emplyeeInfo', EmplyeeSchema)
module.exports = Emplyee