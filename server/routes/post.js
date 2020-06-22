const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post =  mongoose.model("Post")




router.get('/allPost',(req,res)=>{
    Post.find()
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/post/:id',(req,res)=>{
    
    Post.findById(req.params.id)
  
    .then(post=>{
        res.json({post})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post('/create',(req,res)=>{
    const {item,price} = req.body 
    if(!item || !price){
      return  res.status(422).json({error:"Plase add all the fields"})
    }

    const post = new Post({
        item,
        price
        
    })
    post.save().then(result=>{
        res.json({result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.delete('/post/:id',(req,res)=>{
    Post.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Offer Deleted!'});
    });
})

router.patch('/post/:id',function(req,res){
    Post.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({

            doc
        })
   })
})


module.exports = router