const GallaryModel=require('../Models/gallary');
exports.addImage=async(req,res)=>{
  try{
        const{link}=req.body;
        const image=new GallaryModel({link,addedby:req.user._id});
        await image.save();
        res.status(200).json({message:"Image Added Successfully",image});
  }
  catch(err){
      console.log(err);
      res.status(500).json({
        error:"Something Went wrong",
        issue:err.message
      })
  }
  
}
exports.getAllGallary=async(req,res)=>{
   try{
      const images=await GallaryModel.find();
      return res.status(200).json({
        message:"Image Fetched Successfully",
        images
      })
   }
    catch(err){
      console.log(err);
      res.status(500).json({
        error:"Something Went wrong",
        issue:err.message
      })
  }
}
exports.deleteImageById=async(req,res)=>{
  try{
     const {id}=req.params;
     const image=await GallaryModel.findByIdAndDelete(id);
     if(image){
         return res.status(200).json({
          message:"Image Deleted"
         });
     }
     return res.status(400).json({
      error:"No Such Image Found"
     });
  }
  catch(err){
      console.log(err);
      res.status(500).json({
        error:"Something Went wrong",
        issue:err.message
      })
  }
}