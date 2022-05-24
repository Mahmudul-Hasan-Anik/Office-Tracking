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
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'Auth'   
    }
})

const Today = mongoose.model('todayClass', TodaySchema)
module.exports = Today