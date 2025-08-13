const facilityModel = require("../Models/facility");

exports.addFacility = async (req, res) => {
  try {
    let body = { ...req.body };
    const facility = new facilityModel({ ...body, addedby: req.user._id });
    await facility.save();
    res.status(200).json({ message: "Facility Added Successfully" }, facility);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something Went wrong",
      issue: err.message,
    });
  }
};
exports.updateFacility = async (req, res) => {
  try {
    const { id } = req.params;
    const facility = await facilityModel.findByIdAndUpdate(id, {
      ...req.body,
      addedby: req.user._id,
    });
    return res
      .status(200)
      .json({ message: "Facility Upadates Successfully" }, facility);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something Went wrong",
      issue: err.message,
    });
  }
};
exports.getAllFacility = async (req, res) => {
  try {
    const facilities = await facilityModel
      .find()
      .populate("addedby", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: facilities,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something Went wrong",
      issue: err.message,
    });
  }
};
exports.deleteFacility = async (req, res) => {
  try {
    const { id } = req.params;
    const facility = await facilityModel.findByIdAndDelete(id);
    if (facility) {
      return res.status(200).json({
        message: "Facility Deleted Successfully",
      });
    }
    return res.status(400).json({
      error: "No Such Facility Found",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something Went wrong",
      issue: err.message,
    });
  }
};
