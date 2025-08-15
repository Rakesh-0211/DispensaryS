import "./manageStaff.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
export const ManageStaff = (props) => {
  const [inputField, setinputField] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
    mobileNo: "",
  });
  const[clickedStaff,setclickedStaff]=useState(null);

  const handleOnChange = (event, key) => {
    setinputField({
      ...inputField,
      [key]: event.target.value,
    });
  };
  const [staffs, setStaffs] = useState([]);
  const fetchData = async () => {
    props.showLoader();
    await axios
      .get("http://localhost:4000/api/auth/get-staff")
      .then((response) => {
        setStaffs(response.data.staffs);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        props.hideLoader();
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleUpdate=async()=>{
  
    await axios.put(`http://localhost:4000/api/auth/update-staff/${clickedStaff?._id}`,inputField,{withCredentials:true}).then((response)=>{
      window.location.reload();
    }).catch(err=>{
      toast.error(err?.response?.data?.error);
    })
  }
  const handleAddStaff=async(e)=>{
    e.preventDefault();
    if(clickedStaff){
      await handleUpdate();
      return;
    }
    if(inputField.name.trim().length===0||
       inputField.email.trim().length===0||
       inputField.password.trim().length===0||
       inputField.designation.trim().length===0||
       inputField.mobileNo.trim().length===0){
        return toast.error("Please fill all the details");
       }
    props.showLoader();
    await axios.post('http://localhost:4000/api/auth/add-staff',inputField,{withCredentials:true}).then((response)=>{
        console.log(response);
        toast.success(response.data.message);
        setStaffs([inputField,...staffs]);
        setinputField({
          name:"",
          email:"",
          password:"",
          designation:"",
          mobileNo:""
        })
      
    }).catch(err=>{
      toast.error(err?.response?.data?.error);
    }).finally(()=>{
      props.hideLoader();
    })
  }
  const handleOnEditBtn=async(item)=>{
     setclickedStaff(item);
     setinputField({...inputField,...item});
  }
  const filterOutData=(id)=>{
    let newArr=staffs.filter((item)=>item?._id!==id);
    setStaffs(newArr);
  }
  const handleOnDeleteBtn=async(id)=>{
     await axios.delete(`http://localhost:4000/api/auth/delete-staff/${id}`,{withCredentials:true}).then((response)=>
      {
        filterOutData(id);
        
     }).catch(err=>{
        toast.error(err?.response.data?.error)
     })
  }
  return (
    <div className="add-staffs-box">
      <form className="register-form" action="">
        <div className="register-form-div">
          <div className="register-input-box">
            <input
              value={inputField.name}
              onChange={(event) => handleOnChange(event, "name")}
              className="input-box-register"
              type="text"
              placeholder="Staff Name"
            />
          </div>
          <div className="register-input-box">
            <input
              value={inputField.email} disabled={clickedStaff}
              onChange={(event) => handleOnChange(event, "email")}
              className="input-box-register"
              type="text"
              placeholder="Email Id"
            />
          </div>
          {
              !clickedStaff&&<div className="register-input-box">
            <input
              value={inputField.password}
              onChange={(event) => handleOnChange(event, "password")}
              className="input-box-register"
              type="text"
              placeholder="Password"
            />
          </div>
          }
          
          
            <div className="register-input-box">
            <input
              value={inputField.designation}
              onChange={(event) => handleOnChange(event, "designation")}
              className="input-box-register"
              type="text"
              placeholder="Designation"
            />
          </div>
          
          
          <div className="register-input-box">
            <input
              value={inputField.mobileNo}
              onChange={(event) => handleOnChange(event, "mobileNo")}
              className="input-box-register"
              type="text"
              placeholder="Mobile No."
            />
          </div>
        </div>
        <button type="submit" className="form-btn reg-btn"
        onClick={handleAddStaff}>
          {!clickedStaff?"Add":"Update"}
        </button>
      </form>
      <div className="list-staffs">
        {staffs.map((item, index) => {
          return (
            <div className="list-staff">
              <div>{item.name}</div>
              <div className="list-staff-btns">
                <div style={{ cursor: "pointer" }}>
                  <EditIcon onClick={()=>handleOnEditBtn(item)} style={{cursor:"pointer"}}/>
                </div>
                <div style={{ cursor: "pointer" }}>
                  <DeleteIcon onClick={()=>handleOnDeleteBtn(item._id)}
                    style={{cursor:"pointer"}}/>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
