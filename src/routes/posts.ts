import express from "express";

const router = express.Router();

import Post from "../models/Post";

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err })
  }
});

router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description, 
  })
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({message: err})
  }
});

router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err })
  }
});

router.delete('/:postId', async (req, res) => {
  try {
    const removedPost = await Post.findOneAndRemove({
      _id: req.params.postId
    });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err })
  }
});

router.patch('/:postId', async (req, res) => {
  try {
    const updatedPost = await Post.findOneAndUpdate({
      _id: req.params.postId
    }, {
      $set: {
        title: req.body.title
      }
    });
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err })
  }
});

export default router;
