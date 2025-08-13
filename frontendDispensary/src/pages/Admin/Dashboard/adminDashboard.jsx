import './adminDashboard.css'
import { useState } from 'react'
import { Modal } from '../../../components/Modal/modal';
import { ManageStaff } from './ManageStaff/manageStaff';
import { ManageEvent } from './manageEvent/manageEvent';

import{Link} from 'react-router-dom'
export const AdminDashboard=()=>{
  const[manageStaffModal,setManageStaffModal]= useState(false);
  const [eventModal,setEventModal]=useState(false);
  const openCloseModal=(value)=>{
      if(value==="event"){
         setEventModal(prev=>!prev);
      }
      else{
         setManageStaffModal(prev=>!prev);
      }
  }
  return(
    <div className='adminDashboard'>
      <div className='welcome-header'>
        <div className='welcome-admin'>Welcome To Admin Panel</div>
        <div className='welcome-admin-right-side'>
          <div className='manage-staff-btn'onClick={()=>{openCloseModal("staff")}}>Manage Staffs</div>
          <div className='manage-staff-btn'onClick={()=>{openCloseModal("event")}} >Events</div>
        </div>

      </div>
      <div className='admin-dashboard-cards'>
         <Link to={'/admin/register-student'} className='admin-dashboard-card'>
               Register Student
         </Link>
         
            <Link to={'/admin/manage-medicine'}
            className='admin-dashboard-card'>
             Manange Medicines
            </Link>
              

         <Link to={'/admin/record'} className='admin-dashboard-card'>
               Records
         </Link>
         <Link to={'/admin/facility'} className='admin-dashboard-card'>
               Facilities
         </Link>
         <Link to={'/admin/nearByHospital'} className='admin-dashboard-card'>
               NearByHospitals
         </Link>
         <Link to={'/admin/gallary'} className='admin-dashboard-card'>
               Gallery
         </Link>
      </div>
      {
            manageStaffModal?<Modal header={"Manage Staffs" } handleClose={openCloseModal}
            value={"staff"} children={<ManageStaff/>}/>:null
      }
      {
            eventModal?<Modal header={"Manage Events"} handleClose={openCloseModal} value={"event"} children={<ManageEvent/>}/>:null

      }

    </div>
  )
}