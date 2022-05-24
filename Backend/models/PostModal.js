const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    hour:{
        type: String,
        required: true
    },
    activity:{
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'Auth'   
    }
})

const Post = mongoose.model('post', PostSchema)
module.exports = Post