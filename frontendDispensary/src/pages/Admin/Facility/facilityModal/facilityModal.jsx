import { useState,useEffect } from "react";
import "./facilityModal.css";
import{toast} from 'react-toastify'
import axios from "axios";
const backend_url=import.meta.env.VITE_BACKEND_URL;
export const FacilityModal = (props) => {
  const[inputField,setInputField]=useState({
    title:"",
    description:""
  })
  const handleOnChange=(event,key)=>{
   
    setInputField({
      ...inputField,
      [key]:event.target.value
    })
  }
  const updateFacility=async(id)=>{
    await axios.put(`${backend_url}/api/facility/update/${id}`,inputField,{withCredentials:true}).then((response)=>{
      window.location.reload();
    }).catch(err=>{
      toast.error(err?.response?.data?.error);
    })
  }
  const handleSubmit=async(e)=>{
     e.preventDefault();
     
     if(inputField.title.trim().length===0||inputField.description.trim().length===0){
       return toast.error("Please Enter all Fields");
     }
     if(props.clickedItem){
      updateFacility(props.clickedItem._id);
      return;
     }
     await axios.post(`${backend_url}/api/facility/add`,inputField,{withCredentials:true}).then((response)=>{
       window.location.reload();
     }).catch(err=>{
      toast.error(err?.response?.data?.error);
     })
     
  }
  useEffect(()=>{
      if(props.clickedItem){
         setInputField({
        
          title:props.clickedItem.title,
          description:props.clickedItem.description
         });
      }
     },[props.clickedItem])
  return (
    <div className="facility-modal">
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="">
          <div className="register-input-box">
            <input value={inputField.title}
              onChange={(event)=>handleOnChange(event,"title")}
              className="input-box-register"
              type="text"
              placeholder="Enter Title"
            />
          </div>
          <div className="register-input-box" style={{marginTop:20}}>
            <textarea
              cols={450}
              rows={10}
               value={inputField.description}
              onChange={(event)=>handleOnChange(event,"description")}
              className="input-box-register"
              type="text"
              placeholder="Add Description"
            />
          </div>
        </div>
        <button type="submit" className="form-btn reg-btn">
          {
            props.clickedItem?"Update":"Add"
          }
        </button>
        
      </form>
    </div>
  );
};
