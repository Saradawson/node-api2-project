// implement your posts router here
const express = require('express');
const Post = require('./posts-model');
const router = express.Router();

router.get('/', (req, res) => {
    Post.find()
        .then(found => {
            res.status(200).json(found);
        })
        .catch(err => {
           res.status(500).json({
            message: "The posts information could not be retrieved",
            err: err.message
           }) 
        }) 
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Post.findById(id)
        .then(post =>{
            if(!post){
                res.status(404).json({
                    message: "The post with the specified ID does not exist" 
                })
            }else{
                res.status(200).json(post);
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The post information could not be retrieved",
                err: err.message
            })
        })
})

router.post('/', (req, res) => {
   const post = req.body;
   if(!post.title || !post.contents){
    res.status(400).json({
        message: "Please provide title and contents for the post" 
    })
   }else{
    Post.insert(post)
        .then(({ id }) => {
            return Post.findById(id)
        })
        .then(newPost => {
            res.status(201).json(newPost);
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the post to the database",
                err: err.message
            })
        })
   }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Post.findById(id)
        .then(post => {
            if(!post){
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }else{
                res.json(post);
                return Post.remove(id);
            } 
        })
        .catch(err => {
            res.status(500).json({
                message: "The post could not be removed",
                err: err.message 
            })
        })
})

router.put('/:id', (req, res) => {

})

router.get('/:id/comments', (req, res) => {

})

module.exports = router;