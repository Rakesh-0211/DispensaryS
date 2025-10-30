const UserModels = require('../Models/user');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

// ✅ Dynamic cookie options (local + vercel safe)
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // only true on Vercel
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};

// ✅ REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, roll, role } = req.body;
    const isExist = await UserModels.findOne({ email });
    if (isExist) {
      return res.status(400).json({
        error: "Already have an account with this email or roll"
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new UserModels({
      name,
      email,
      roll,
      password: hashedPassword,
      role: role || "student"
    });

    await user.save();
    res.status(201).json({
      message: 'User registered successfully',
      success: "yes",
      data: user
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong",
      issue: err.message
    });
  }
};

// ✅ LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExist = await UserModels.findOne({ email });

    if (isExist && await bcryptjs.compare(password, isExist.password)) {
      const token = jwt.sign({ userId: isExist._id }, 'Its_My_Secret_Key');

      // ✅ Correct cookie setup for local + production
      res.cookie('token', token, cookieOptions);

      return res.status(200).json({
        message: 'Logged in successfully',
        success: "true",
        isExist,
        token
      });
    } else {
      return res.status(400).json({
        error: 'Invalid Credential'
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something Went Wrong",
      issue: err.message
    });
  }
};

// ✅ SEND OTP
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModels.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const buffer = crypto.randomBytes(4);
    const token = buffer.readInt32BE(0) % 900000 + 100000;
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Your OTP is: ${token}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json({
          error: 'Server error',
          errorMsg: error
        });
      } else {
        res.status(200).json({
          message: "OTP Sent to your email"
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something Went Wrong",
      issue: err.message
    });
  }
};

// ✅ VERIFY OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const user = await UserModels.findOne({
      email,
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        error: 'OTP is invalid or has expired, please try again'
      });
    }

    res.status(200).json({
      message: 'OTP is Successfully Verified'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something Went Wrong",
      issue: err.message
    });
  }
};

// ✅ RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await UserModels.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Technical issue, please try again later' });
    }

    const updatedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = updatedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({
      message: "Password reset successfully"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something Went Wrong",
      issue: err.message
    });
  }
};

// ✅ UPDATE STUDENT
exports.updateStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateStudent = await UserModels.findByIdAndUpdate(id, req.body, { new: true });

    if (updateStudent) {
      return res.status(200).json({ message: "Student Updated Successfully" });
    }

    return res.status(400).json({ error: "No such Student exists" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something Went Wrong",
      issue: err.message
    });
  }
};

// ✅ GET STUDENT BY ROLL
exports.getStudentByRollNo = async (req, res) => {
  try {
    const { roll } = req.params;
    const student = await UserModels.findOne({ roll });

    if (student) {
      return res.status(200).json({
        message: "Student fetched Successfully",
        student
      });
    }

    return res.status(400).json({ error: 'No such student exists' });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something Went Wrong",
      issue: err.message
    });
  }
};

// ✅ STAFF REGISTRATION BY STAFF
exports.registerStudentByStaff = async (req, res) => {
  try {
    const buffer = crypto.randomBytes(4);
    let token = buffer.readUInt32LE(0) % 900000 + 100000;
    let { _id, ...body } = req.body;

    const isExist = await UserModels.findOne({ email: body.email });
    if (isExist) {
      return res.status(400).json({
        error: "Already have an account with this email"
      });
    }

    token = token.toString();
    const updatePass = await bcryptjs.hash(token, 10);

    const user = new UserModels({
      ...body,
      password: updatePass
    });

    await user.save();

    const mailOptions = {
      from: process.env.EMAIL,
      to: body.email,
      subject: 'Password for Dispensary System',
      text: `Hi, Your password for Dispensary system is ${token} registered with email ${body.email}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json({ error: 'Server error', errorMsg: error });
      } else {
        res.status(200).json({ message: 'Password sent to your email id' });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something Went Wrong",
      issue: err.message
    });
  }
};

// ✅ ADD STAFF
exports.addStaffByAdmin = async (req, res) => {
  try {
    const { name, email, password, designation, mobileNo } = req.body;
    const searchStaff = await UserModels.findOne({ email });

    if (searchStaff) {
      return res.status(400).json({ error: "Already have an account with this email id" });
    }

    const updatedPass = await bcryptjs.hash(password, 10);
    const user = new UserModels({
      name,
      email,
      designation,
      mobileNo,
      password: updatedPass,
      role: 'staff'
    });

    await user.save();

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password for Dispensary System',
      text: `Hi, Your password for Dispensary system is ${password} for staff portal`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json({ error: 'Server error', errorMsg: error });
      } else {
        res.status(200).json({ message: "Password sent to your staff's email id" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something Went Wrong",
      issue: err.message
    });
  }
};

// ✅ GET STAFFS
exports.getAllStaffs = async (req, res) => {
  try {
    const staffs = await UserModels.find({ role: "staff" });
    return res.status(200).json({ staffs });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something Went Wrong",
      issue: err.message
    });
  }
};

// ✅ UPDATE STAFF
exports.updateStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, mobileNo } = req.body;
    const staff = await UserModels.findById(id);

    if (staff) {
      staff.name = name;
      staff.designation = designation;
      staff.mobileNo = mobileNo;
      await staff.save();
      return res.status(200).json({ message: "Successfully Updated" });
    } else {
      return res.status(400).json({ error: "No such staff exists" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something Went Wrong",
      issue: err.message
    });
  }
};

// ✅ DELETE STAFF
exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await UserModels.findByIdAndDelete(id);

    if (deleteUser) {
      return res.status(200).json({ message: "Staff deleted successfully" });
    }

    return res.status(400).json({ error: 'No such staff exists' });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something Went Wrong",
      issue: err.message
    });
  }
};

// ✅ LOGOUT
exports.logout = async (req, res) => {
  console.log("Logout route hit");
  res
    .clearCookie('token', cookieOptions)
    .status(200)
    .json({ message: 'Logged out successfully' });
};
