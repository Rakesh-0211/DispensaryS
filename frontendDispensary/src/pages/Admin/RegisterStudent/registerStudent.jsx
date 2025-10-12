import "./registerStudent.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { SearchBox } from "../../../components/searchBox/searchBox";
import { useState } from "react";
import { Modal } from "../../../components/Modal/modal";
import { Report } from "./Report/report";
import { toast } from "react-toastify";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import axios from "axios";
export const RegisterStudent = (props) => {
  const [searchStudent, setSearchStudent] = useState("");
  const [studentDetail, setStudentDetail] = useState({
    name: "",
    email: "",
    roll: "",
    mobileNo: "",
    fatherName: "",
    fatherMobile: "",
    previous_health: "",
    address: "",
    age: "",
    bloodGroup: "",
  });
  const [reportModal, setReportModal] = useState(false);
  const handleOnChange = (value) => {
    setSearchStudent(value);
  };
  const openCloseModal = () => {
    setReportModal((prev) => !prev);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleOnChangeInputField = (event, key) => {
    setStudentDetail({
      ...studentDetail,
      [key]: event.target.value,
    });
  };
  const handleSearch = async () => {
    if (searchStudent.trim().length === 0) {
      return toast.error("Please enter correct roll number.");
    }
    props.showLoader();
    await axios
      .get(
        `${backendUrl}/api/auth/get-student-by-roll/${searchStudent}`,
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        setStudentDetail({ ...studentDetail, ...response.data.student });
      })
      .catch((err) => {
        setStudentDetail({
          _id: "",
          email: "",
          name: "",
          roll: "",
          mobileNo: "",
          fatherName: "",
          fatherMobile: "",
          address: "",
          previous_health: "",
          bloodGroup: "",
        });
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };
  const handleUpdateFunc=async()=>{
    if(studentDetail.name.trim().length===0||
       studentDetail.email.trim().length===0||
       studentDetail.roll.trim().length===0||
       studentDetail.mobileNo.trim().length===0){
        return toast.error("Name,Mobile No and Roll can't be empty");
       }
    props.showLoader();
    const{_id,updateAt,...student}={...studentDetail};
    await axios.put(`${backendUrl}/api/auth/update-student/${_id}`,student,{withCredentials:true}).then(response=>{
      console.log(response);
    }).catch(err=>{
      toast.error(err?.reponse?.data?.error);
      console.log(err);
    }).finally(()=>{
      props.hideLoader();
    })
  }
  const registerStudent=async()=>{
    if(studentDetail.name.trim().length===0||studentDetail.email.trim().length===0||studentDetail.roll.trim().length===0||studentDetail.mobileNo.trim().length===0){
      return toast.error("Name,Mobile No and Roll can't be empty");
    }
    props.showLoader();
    await axios.post(`${backendUrl}/api/auth/registerStudentByStaff`,studentDetail,{withCredentials:true}).then((response)=>{
      toast.success(response.data.message);
    }).catch(err=>{
       setStudentDetail({
        _id:"",
        email:"",
        name:"",
        roll:"",
        mobileNo:"",
        fatherName:"",
        fatherMobile:"",
        address:"",
        previous_health:"",
        bloodGroup:"",
        age:""
       })
       toast.error(err?.response?.data?.error);
    }).finally(()=>{
      props.hideLoader();
    })
  }
  return (
    <div className="register-student">
      <div className="go-back">
        <Link to={"/admin/dashboard"}>
          <ArrowBackIcon />
          Back To Dashboard
        </Link>
      </div>
      <SearchBox
        handleClick={handleSearch}
        placeholder={"Search By Roll No."}
        value={searchStudent}
        onChange={handleOnChange}
      />
      <div className="register-form-block">
        <div className="register-form-header">Register Student</div>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-form-div">
            <div className="register-input-box">
              <input
                value={studentDetail.name}
                onChange={(event) => handleOnChangeInputField(event, "name")}
                className="input-box-register"
                type="text"
                placeholder="Student Name"
              />
            </div>
            <div className="register-input-box">
              <input disabled={studentDetail?._id}
                value={studentDetail.email}
                onChange={(event) => handleOnChangeInputField(event, "email")}
                className="input-box-register"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="register-input-box">
              <input
                value={studentDetail.roll}
                onChange={(event) => handleOnChangeInputField(event, "roll")}
                className="input-box-register"
                type="text"
                placeholder="Roll No."
              />
            </div>
            <div className="register-input-box">
              <input
                value={studentDetail.mobileNo}
                onChange={(event) =>
                  handleOnChangeInputField(event, "mobileNo")
                }
                className="input-box-register"
                type="text"
                placeholder="Mobile No."
              />
            </div>
            <div className="register-input-box">
              <input
                value={studentDetail.fatherName}
                onChange={(event) =>
                  handleOnChangeInputField(event, "fatherName")
                }
                className="input-box-register"
                type="text"
                placeholder="Fathers Name"
              />
            </div>
            <div className="register-input-box">
              <input
                value={studentDetail.fatherMobile}
                onChange={(event) =>
                  handleOnChangeInputField(event, "fatherMobile")
                }
                className="input-box-register"
                type="text"
                placeholder="Father Mobile No."
              />
            </div>
            <div className="register-input-box">
              <input
                value={studentDetail.address}
                onChange={(event) => handleOnChangeInputField(event, "address")}
                className="input-box-register"
                type="text"
                placeholder="Address"
              />
            </div>
            <div className="register-input-box">
              <input
                value={studentDetail.previous_health}
                onChange={(event) =>
                  handleOnChangeInputField(event, "previous_health")
                }
                className="input-box-register"
                type="text"
                placeholder="Previous Health Issues"
              />
            </div>
            <div className="register-input-box">
              <input
                value={studentDetail.age}
                onChange={(event) => handleOnChangeInputField(event, "age")}
                className="input-box-register"
                type="text"
                placeholder="Age"
              />
            </div>
            <div className="register-input-box">
              <input
                value={studentDetail.bloodGroup}
                onChange={(event) =>
                  handleOnChangeInputField(event, "bloodGroup")
                }
                className="input-box-register"
                type="text"
                placeholder="Blood Group"
              />
            </div>
          </div>
          {studentDetail?._id ? (
            <div className="whole">
              <button type="submit" className="form-btn reg-btn" onClick={handleUpdateFunc}>
                Update
              </button>
              <button
                type="submit"
                className="form-btn reg-btn"
                onClick={openCloseModal}
              >
                Report
              </button>
            </div>
          ) : (
            <button type="submit" className="form-btn reg-btn" onClick={registerStudent}>
              Register
            </button>
          )}
        </form>
      </div>
      {reportModal ? (
        <Modal
          header="Report"
          handleClose={openCloseModal}
          children={<Report studentDetail={studentDetail}
          handleCloseModal={openCloseModal}/>}
        />
      ) : null}
    </div>
  );
};
