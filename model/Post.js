const mongoose= require('mongoose');



const PostSchema=mongoose.Schema({

    name:{
        type:String,
        required:true,
        
    },


    email:{
        type:String,
        required:true,
        
    },



    phone:{
        type:String,
        required:true,
        
    },

    category:{
        type:Array,
        
        
    },

    urlpath:
        {
            type: String,
            
        },



        image:
        {
            type: String,
           
        },    


        files:
        {
            type: String,
           
        },    

            position:{
                type:String,
            }

},
{timestamps:true}
);


module.exports=mongoose.model("posts" , PostSchema);