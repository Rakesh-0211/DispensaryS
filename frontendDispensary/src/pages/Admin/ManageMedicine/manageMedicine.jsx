import "./manageMedicine.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { SearchBox } from "../../../components/searchBox/searchBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { Modal } from "../../../components/Modal/modal";
import { MedicineModal } from "./MedicineModal/medincineModal";
export const ManageMedicine = () => {
  const [medicineSearch, setMedicineSearch] = useState("");
  const[addModal,setAddModal]=useState(false);
  const onOffModal=()=>{
  setAddModal(prev=>!prev);
  }
  const onChangeValue = (value) => {
    setMedicineSearch(value);
  };
  return (
    <div className="manageMedicine">
      <div className="go-back">
        <Link to={"/admin/dashboard"}>
          <ArrowBackIcon />
          Back To Dashboard
        </Link>
      </div>
      <div className="top-manage-medicine">
        <SearchBox
          placeholder="Search Medicine"
          value={medicineSearch}
          onChange={onChangeValue}
        />
        <div className="add-manage-medicine" onClick={onOffModal}>Add</div>
      </div>
      <div className="manageMedicine-card">
        <div className="report-form-rows">
          <div className="report-form-header">
            <div className="">Sr. No.</div>
            <div className="col-2-mng">Medicine Name</div>
            <div className="col-2-mng">Added By</div>
            <div className="col-3-mng">Quantity</div>
            <div className="">Edit</div>
            <div className="">Delete</div>
          </div>

          <div className="report-form-row-block">
            <div className="report-form-row">
              <div className="">2</div>
              <div className="col-2-mng">Paracetamol</div>
              <div className="col-2-mng">Danish</div>
              <div className="col-3-mng">12</div>
              <div className="edit-icon"><EditIcon/></div>
              <div className="delete-icon">
                <DeleteIcon />
              </div>
            </div>
            <div className="report-form-row">
              <div>No Any Medicine Yet</div>
            </div>
          </div>
        </div>
      </div>
      {
        addModal?<Modal header="Add Medicine" handleClose={onOffModal} children={<MedicineModal/>}/>:null
      }
    </div>
  );
};
