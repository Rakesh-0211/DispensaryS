import React from "react"
import './header.css'
import { useState,useEffect } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import { useLocation,useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export const Header=(props)=>{
  const location=useLocation();
  const navigate=useNavigate();
  const[eventpopup,setEventpopup]=useState(false);
  const[helpline,setHelpline]=useState(false);
  const handleOpenPopup=(popup)=>{
    if(popup==="event"){
      setEventpopup(true);
    }
    else{
      setHelpline(true);
    }
  }
  const handleClosePopup=(popup)=>{
    if(popup==="event"){
      setEventpopup(false);
    }
    else{
      setHelpline(false);
    }
  }
  const handleLogin=()=>{
     navigate('/login');
  }
  const handleLogout=async()=>{
  props.showLoader();
   await axios.post('http://localhost:4000/api/auth/logout',{},{withCredentials:true}).then((response)=>{
      console.log(response);
      props.handleLogin(false);
      localStorage.clear();
      navigate('/');
   }).catch(err=>{
    console.log(err);
    toast.error(err?.response?.data?.error);
   }).finally(()=>{
    props.hideLoader();
   })
  }
  return(
    <div className="header">
       <div className="header-college-details">
        <div className="header-college-details-left">
            <img className="header-college-details-left-logo"src="https://www.figma.com/community/resource/426e953c-667f-47e5-b18c-c29929215300/thumbnail" alt="college-logo" />
            <div>
              <div className="header-college-details-name">
                  राष्ट्रीय प्रौद्योगिकी संस्थान
              </div>
             <div className="header-college=details-place">
                  राउरकेला
              </div>
              <div className="header-college-details-name">
                  National Institute Of Technology
              </div>
             <div className="header-college=details-place">
                  Rourkela
              </div>
            </div>
        </div>
        <div className="header-college-details-right">
            <div className="header-college-social-media">
              <div className="icon-management">
                <a href="https://www.instagram.com/nitrourkela1961/?hl=en" className="header-social-media-image"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="" /></a>
               <a href="https://www.facebook.com/rourkelanit/" className="header-social-media-image"> <img src="https://cdn-icons-png.freepik.com/256/15707/15707884.png?semt=ais_hybrid" alt="" />
               </a>
               <a href="https://www.linkedin.com/school/national-institute-of-technology-rourkela/posts/?feedView=all" className="header-social-media-image">
               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkSy3G6vtUUs77HKhep2jilTVRHhKKvhmRfP73SdTohKsP786dIYymh34&s" alt="" /></a>
               <a href="https://t.me/s/nitrkl?before=2449" className="header-social-media-image"><img src="https://img.icons8.com/?size=80&id=k4jADXhS5U1t&format=png" alt="" /></a>
            </div>

              </div>
               
            <input type="text" className="header-input-tags" />
        </div>

       </div>
      <div className="navbar">
        <Link to={"/"} className={`navbar-links ${location.pathname==="/"?"active-link":null}`}>
             Home
        </Link>
        <div onClick={props.isLogin?handleLogout:handleLogin}className={`navbar-links ${location.pathname==="/login"?"active-link":null}`}>
             {props.isLogin?"Logout":"Login"}
        </div>
        <Link to ={"/stock"}className={`navbar-links ${location.pathname==="/stock"?"active-link":null}`}>
             Stock View
        </Link>
        <div  className={`navbar-links event-links ${location.pathname==="/new-events"?"active-link":null}`}onMouseEnter={()=>handleOpenPopup("event")} onMouseLeave={()=>handleClosePopup("event")}>
            <div className="navbar-link-opt">
                New Events <ArrowDropDownIcon/>
            </div>
             {
               eventpopup?<div className="navbar-dropdown-popup event-pop">
                <div className="popup-notification" >. Christmas Celebration</div>
                <div className="popup-notification" >. Diwali Celebration</div>
             </div>:null
             }
             
        </div>
        <div  className={`navbar-links event-links ${location.pathname==="/helpline"?"active-link":null}`}onMouseEnter={()=>handleOpenPopup("helpline")} onMouseLeave={()=>handleClosePopup("helpline")}>
            <div className="navbar-link-opt">
                Helpline <ArrowDropDownIcon/>
            </div>
             {
               helpline?<div className="navbar-dropdown-popup event-pop helplinepop">
                <div className="popup-notification" >.Disaster management:1007 </div>
                <div className="popup-notification" >. Diwali Celebration</div>
             </div>:null
             }
             
        </div>

      </div>
{
     location.pathname==="/" ? <div className="header-banner">
          <img src="https://nitrkl.ac.in/eptp/images/fraction-slider/101.jpg" alt="" />
      </div>:null
}

    </div>
  )
}
