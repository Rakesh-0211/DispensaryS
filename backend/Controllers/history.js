const HistoryModel=require("../Models/history");
const MedicineModel=require("../Models/medicine");


exports.addHistory=async(req,res)=>{
   try{
       let {roll,student,medicines}=req.body;
       let medicineData=medicines.map((item)=>{
        let{_id,name,requireQuantity}=item;
        return {_id,name,requireQuantity};
       })
       medicineData.map(async(item)=>{
           let medicineData=await MedicineModel.findById(item._id);
           let leftQuantity=parseInt(medicineData.quantity)-parseInt(item.requireQuantity);
           medicineData.quantity=leftQuantity.toString();
           await medicineData.save();
       })
       const addData=new HistoryModel({roll,student,medicines});
       await addData.save();
       return res.status(200).json({
        message:"Added Successfully"
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
exports.getHistoryByData=async(req,res)=>{
   try{
     let{month,year}=req.query;
     const monthIndex=new Date(`${month} 1,${year}`).getMonth();//convert month name to index
     const startDate=new Date(year,monthIndex,1);
     const endDate=new Date(year,monthIndex+1,1);
     const history=await HistoryModel.find({
      createdAt:{$gte:startDate,$it:endDate}
     }).populate("student").sort({createdAt:-1});
     return res.status(200).json({
      message:"Fetched Successfully",
      history
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
exports.getStudentHistory=async(req,res)=>{
  try{
        const{roll}=req.query;
        const history=await HistoryModel.find({roll}).populate("student").sort({createdAt:-1});
        if(history===0){
          return res.status(400).json({error:"No any record found for this roll"})
        }
        return res.status(200).json({
          message:"Fetched Successfully",
          history
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
