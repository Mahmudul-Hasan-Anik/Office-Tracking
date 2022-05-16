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
    }
})

const Post = mongoose.model('post', PostSchema)
module.exports = Post