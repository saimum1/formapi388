const Post=require('../model/Post');
const express=require('express');
const router=express.Router();
const multer=require('multer');
const path = require("path");
const app=express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
const cors= require("cors");




app.use(cors());
app.use("files", express.static(path.join(__dirname, "files")));
app.use("images", express.static(path.join(__dirname, "images")));



   const storage = multer.diskStorage({

    destination: function (req, file, cb) {
     
      cb(null, "files");
    },
    filename: function (req, file, cb) {
        
     

      cb(null, req.body.name);
    },
   });


   const storage2 = multer.diskStorage({

    destination: function (req, file, cb) {
     
      cb(null, "images");
    },
    filename: function (req, file, cb) {
        
    

      cb(null, req.body.name);
    },
   });



const upload= multer({storage:storage}); 

router.post('/file' ,upload.single("files") ,(req,res)=>{
res.status(200).json("uploaded")
})

const upload2= multer({storage:storage2}); 

router.post('/image' ,upload2.single("images") ,(req,res)=>{
    res.status(200).json("uploaded")
})



router.post('/',async (req ,res)=>{
    try {
        const newPost= new Post({

            name:req.body.name,
        
            email:req.body.email,
        
            phone:req.body.phone,
        
            category:req.body.category,
        
            urlpath:req.body.url,
            position:req.body.position,
        
        
        });


        const posts = await newPost.save();
        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json(error);
    }

  


});


// router.put('/:id' ,async (req ,res)=>{


//     const post= await Post.findById(req.params.id);

//     try {

//         if(post.username === req.body.username){
//             const updatedpost= await Post.findByIdAndUpdate(req.params.id, {
//                 $set:req.body,
//             },{new:true})
    
//             res.status(200).json(updatedpost);
//         }else{
//             res.status(500).json("unathorized user")
//         }
      
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });



// router.delete('/:id' ,async (req ,res)=>{


//     const post= await Post.findById(req.params.id);

//     try {

//         if(post.username === req.body.username){

//             const deletepost= await Post.findByIdAndDelete(req.params.id);
//             res.status(200).json(deletepost);

//         }else{
//             res.status(500).json("unathorized user")
//         }
      
//     } catch (error) {
//         res.status(500).json(error);
//     }

// });


//get one

router.get('/:id' ,async (req ,res)=>{


    try {

        const post= await Post.findById(req.params.id);
            res.status(200).json(post);
        }
             
    catch (error) {
        res.status(500).json(error);
    }

});


//get all

router.get('/' ,async (req ,res)=>{

const name= req.query.user;
const email=req.query.email;
    try {
        let posts;

        if(name){
            posts= await Post.find({name:name})

            
        }
        else if(email){
            posts= await Post.find({email:email})
        }

        else{
             posts= await Post.find(req.params.id);
            
        }
        res.status(200).json(posts);

        }
        
      
    catch (error) {
        res.status(500).json(error);
    }

});



module.exports=router;