const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /posts");
  
    next(); 
});
  
tagsRouter.get('/', async (req, res) => {
      const tags = await getAllTags();
    
      res.send({
        tags
      });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    // read the tagname from the params
    const {tagName} = req.params
    try {
        const posts = await getPostsByTagName(tagName);
      // use our method to get posts by tag name from the db
      // send out an object to the client { posts: // the posts }
      res.send({posts})
    } catch ({ name, message }) {
      // forward the name and message to the error handler
      next({ name, message })
    }
});


module.exports = tagsRouter;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGJlcnQiLCJpYXQiOjE2MTM4NDA4NzV9.qLM19JVkyd1_oOeTbRqC6BvASR-rRboPr03_Ga3FZY4





