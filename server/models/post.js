const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    item:{
        type:String,
        required:true
    },
   price:{
       type:Number,
       required:true
   } 
    
})

mongoose.model("Post",postSchema)