const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    name: String,
    space: String,
    open: String,
    location: String,
    image: String,
    review: String,
    created: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("Post", postSchema);