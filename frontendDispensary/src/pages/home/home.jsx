import Diversity3Icon from '@mui/icons-material/Diversity3'
import './home.css'
import HomeIcon from '@mui/icons-material/Home'
import PeopleAltIcon  from '@mui/icons-material/PeopleAlt'
import  LocalHospitalIcon  from '@mui/icons-material/LocalHospital'
import ImageIcon from '@mui/icons-material/Image'
import { AboutUs } from '../../components/About-Us/about-Us'
import { useState } from 'react'
import { Staff } from '../../components/Staffs/staff'
import { Facilities } from '../../components/Facilities/facilities'
import { NearByHospitals } from '../../components/NearByHospitals/near-By-Hospitals'
import { Gallary } from '../../components/Gallery/gallary'
export const Home=(props)=>{
   const[page,setPage]=useState("About");
   let[rightSideHeader,setRightSideHeader]=useState("About Us");
   const handleTabChange=(pagename)=>{
       setPage(pagename);
       switch(pagename){
        case "About":
          setRightSideHeader("About Us");
          break;
        case "Staff":
          setRightSideHeader("Our Staffs");
          break;
        case "Facilities":
          setRightSideHeader("Facilities");
          break;
        case "NearByHospitals":
          setRightSideHeader("Near By Hospitals");
          break;
        case "Gallary":
          setRightSideHeader("Gallary");
          break;
       }
   }
   const getComponent=()=>{
    switch(page){
      case"About":
      return <AboutUs/>
      case"Staff":
      return<Staff showLoader={props.showLoader} hideLoader={props.hideLoader}/>
      case"Facilities":
      return <Facilities showLoader={props.showLoader} hideLoader={props.hideLoader}/>
      case"NearByHospitals":
      return <NearByHospitals showLoader={props.showLoader} hideLoader={props.hideLoader}/>
      case"Gallary":
      return <Gallary showLoader={props.showLoader} hideLoader={props.hideLoader}/>
      default:
      return null;
    }
   }
  return(
  <div className="home">
      <div className='home-block'>
        <div className='home-left-page'>
           <div className={`home-left-option ${page==="About"?"active-opt":null}`} onClick={()=>handleTabChange("About")}>
                <HomeIcon/>
                About Us
           </div>
           <div className={`home-left-option ${page==="Staff"?"active-opt":null}`} onClick={()=>handleTabChange("Staff")}>
                <PeopleAltIcon/>
                 Staffs
           </div>
           <div className={`home-left-option ${page==="Facilities"?"active-opt":null}`} onClick={()=>handleTabChange("Facilities")}>
                <Diversity3Icon/>
                Facillites
           </div>
           <div className={`home-left-option ${page==="NearByHospitals"?"active-opt":null}`} onClick={()=>handleTabChange("NearByHospitals")}>
                <LocalHospitalIcon/>
                Near By Hospitals
           </div>
            <div className={`home-left-option ${page==="Gallary"?"active-opt":null}`} onClick={()=>handleTabChange("Gallary")}>
                <ImageIcon/>
                Gallary
           </div>
        </div>
        <div className='home-right-page'>
             <div className='home-right-header'>
                   {rightSideHeader}
             </div>
             <div className='home-right-section'>
               {getComponent()} 
             </div>
        </div>

      </div>
  </div>
  )
 
}