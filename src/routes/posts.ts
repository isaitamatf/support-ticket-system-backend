import express from "express";

import { PostModel } from "../models";

const postsRoute = express.Router();

// GET POSTS
postsRoute.get('/', async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err })
  }
});

// POST POST
postsRoute.post('/', async (req, res) => {
  const post = new PostModel({
    title: req.body.title,
    description: req.body.description,
  })
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err })
  }
});

// GET POST
postsRoute.get('/:postId', async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err })
  }
});

// DELETE POST
postsRoute.delete('/:postId', async (req, res) => {
  try {
    const removedPost = await PostModel.findOneAndRemove({
      _id: req.params.postId
    });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err })
  }
});

// UPDATE POST
postsRoute.patch('/:postId', async (req, res) => {
  try {
    const updatedPost = await PostModel.findOneAndUpdate({
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

export { postsRoute };
