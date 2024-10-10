const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const PostSchema = new Schema({
    title:String,
    resumo:String,
    content:String,
    cover:String,
    autor:{tyoe:Schema.Types.ObjectId, ref:'User'},
}, {
    timestamps:true,
})

const PostModel = model('Post', PostSchema);

module.exports = PostModel;