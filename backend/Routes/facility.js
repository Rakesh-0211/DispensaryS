const express=require("express");
const router=express.Router();
const Authentication=require('../Authentication/auth');
const FacilityController=require('../Controllers/facility');
router.post('/add',Authentication.adminFacultyAuth,
  FacilityController.addFacility
)
router.put('/upadate/:id',Authentication.adminFacultyAuth,
  FacilityController.updateFacility
)
router.get('/get',FacilityController.getAllFacility);
router.delete('/delete/:id',Authentication.adminFacultyAuth,FacilityController.deleteFacility);
module.exports=router;
