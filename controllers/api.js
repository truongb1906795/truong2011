const Post = require("../models/post");
const fs = require("fs");
module.exports = class API {
    
    static async fetchAllPost(req, res){
        try {
            const posts = await Post.find();
            res.status(200).json(posts);
        } catch (err) {
            res.status(404).json({ message: err.message});
        }
    }
    
    static async fetchPostByID(req, res){
        const id = req.params.id;
        try {
            const post = await Post.findById(id);
            res.status(200).json(post);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    
    static async createPost(req, res){
        const post = req.body;
        const img = req.file.filename;
        post.image = img;
        try {
            await Post.create(post);
            res.status(201).json({ message: "Bài viết đã được tạo thành công!"});
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    
    static async updatePost(req, res){
        const id = req.params.id;
        let new_image = "";
        if (req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync("./uploads/" + req.body.old_image);
            } catch (err) {
                console.log(err);
            }
        } else {
            new_image = req.body.old_image;
        }
        const newPost = req.body;
        newPost.image = new_image;

        try {
            await Post.findByIdAndUpdate(id, newPost);
            res.status(200).json({ message: "Bài viết đã được cập nhật thành công!" });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
   
    static async deletePost(req, res){
        const id = req.params.id;
        try {
            const result = await Post.findByIdAndDelete(id);
            if(result.image != ''){
                try {
                    fs.unlinkSync('./uploads'+result.image);
                } catch (err) {
                    console.log(err);
                }
            }
            res.status(200).json({message: 'Bài viết đã được xóa thành công!'});
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
};