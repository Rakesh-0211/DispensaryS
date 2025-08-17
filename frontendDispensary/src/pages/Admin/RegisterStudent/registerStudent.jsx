import "./registerStudent.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { SearchBox } from "../../../components/searchBox/searchBox";
import { useState } from "react";
import { Modal } from "../../../components/Modal/modal";
import { Report } from "./Report/report";
export const RegisterStudent = () => {
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
  return (
    <div className="register-student">
      <div className="go-back">
        <Link to={"/admin/dashboard"}>
          <ArrowBackIcon />
          Back To Dashboard
        </Link>
      </div>
      <SearchBox
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
              <input
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
          <button type="submit" className="form-btn reg-btn">
            Register
          </button>
          <div className="block-divs">
            <button type="submit" className="form-btn reg-btn">
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
        </form>
      </div>
      {reportModal ? (
        <Modal
          header="Report"
          handleClose={openCloseModal}
          children={<Report />}
        />
      ) : null}
    </div>
  );
};
