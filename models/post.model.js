const mongoose = require("mongoose");
require("dotenv").config();


const postSchema = mongoose.Schema({
    title: String,
    body: String,
    device: String,
});

const PostModel = mongoose.model("post",postSchema);

module.exports = {PostModel};
