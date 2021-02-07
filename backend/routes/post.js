var express =require('express')
var router = express.Router()
const auth = require('../middleware/check-auth')

var db = require('../databases/Post')

router.get("/",auth,(req,res)=>{
    db.find().then(data=>{
        res.status(201).json({
            posts:data
        })
    })
})

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
})


router.post("/",(req,res)=>{
var post = new db({
    title:req.body.title,
    content:req.body.content
})
post.save()
})


router.delete("/:id", (req, res, next) => {
    db.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Post deleted!" });
    });
  });

module.exports =  router