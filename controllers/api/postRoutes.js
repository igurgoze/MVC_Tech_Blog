const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

//Create new Post
router.post('/', withAuth, async (req,res) => {
  try {
    const newPost = await Post.create({
      title: req.body.postTitle,
      description: req.body.postDescription,
      user_id: req.session.user_id
    })
    res.status(200).json(newPost)
  }
  catch (err) {
    res.status(400).json
  }
})


//Delete post
router.delete('/:id', withAuth, async (req,res) => {
  try {
    console.log(req.params.id)
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!deletePost) {
      res.status(404).json("No Post found with this ID!")
      return
    }

    res.status(200).json(deletePost)
  }


  catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;