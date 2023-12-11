const {Router} = require("express");
const { PostModel } = require("../models/post.model");
const {auth} = require("../middlewares/auth")

const postRouter = Router();


//new post addedd //
postRouter.post("/add",auth,async(req,res)=>{
    // const {title,body,device} = req.body;
try {
    let post= await new PostModel(req.body);
    post.save();
    res.status(200).json({msg:"Post added successfully"})
} catch (error) {
    res.status(400).json({error: error.message});
}
})


////update the data ///
postRouter.patch("update/:postID", auth, async(res,req)=>{
const {postID} = req.params;
const {UserID} = req.body;

try {
    const post = await PostModel.findByIdAndUpdate({
        UserID, _id :postID,
    }, req.body);

    if(post){
res.status(200).json({msg:"Post updated"})
    }else{
        res.status(400).json({msg:"Post not match"})
    }

} catch (error) {
    res.status(400).json({error:error.message});
}
})


///Delete post data//
postRouter.delete("/delete/:postID",async(res,req)=>{
    const {postID} = req.params;
    const {UserID} = req.body;
    
    try {
        const post = await PostModel.findByIdAndDelete({
            UserID, _id :postID,
        });
    
        if(post){
    res.status(200).json({msg:"Post deleted"})
        }else{
            res.status(400).json({msg:"Post not match"})
        }
    
    } catch (error) {
        res.status(400).json({error:error.message});
    }
})


module.exports = {postRouter}