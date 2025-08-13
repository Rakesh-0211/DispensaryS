import './nearByHospital.css'
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { Modal } from "../../../components/Modal/modal";
import { NearByModal } from './NearByModal/nearByModal';
export const NearByHospitals=()=>{
   const [modal,setModal]=useState(false);
  const onOffModal=()=>{
    setModal(prev=>!prev);
  }
  return(
    <div className="admin-facility">
      <div className="go-back">
        <Link to={"/admin/dashboard"}>
          <ArrowBackIcon />
          Back To Dashboard
        </Link>
      </div>
      <div className="admin-facility-header">
        <div>Near By Hospitals</div>
        <div onClick={onOffModal}className="add-facility-btn">Add</div>
      </div>
      <div className="admin-facility-rows">
        <div className="admin-facility-row">
          <div className="admin-facility-left">
            <div className="admin-facility-title">Name</div>
            <div>Address:Delhi</div>
            <div>+916370855752</div>
            <div style={{ marginTop: "10px" }}>Added By:Danish</div>
          </div>
          <div className="admin-facility-btn">
            <div><EditIcon/></div>
            <div><DeleteIcon/></div>
          </div>
        </div>
      </div>
      {
        modal?<Modal header="Add Facility" handleClose={onOffModal} children={<NearByModal/>} />:null
      }
    </div>
  )
}