const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodaySchema = new Schema({
    batch:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    room:{
        type: String,
        required: true
    }
})

const Today = mongoose.model('todayClass', TodaySchema)
module.exports = Today