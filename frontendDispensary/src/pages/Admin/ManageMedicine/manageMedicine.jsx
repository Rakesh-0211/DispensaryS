import "./manageMedicine.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { SearchBox } from "../../../components/searchBox/searchBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Modal } from "../../../components/Modal/modal";
import { MedicineModal } from "./MedicineModal/medincineModal";
import { toast } from "react-toastify";
import axios from "axios";
export const ManageMedicine = (props) => {
  const [medicineSearch, setMedicineSearch] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [data, setData] = useState([]);
  const[clickedMedicine,setClickedMedicine]=useState(null);
  const onOffModal = () => {
    if(addModal){
      setClickedMedicine(null);
    }
    setAddModal((prev) => !prev);
  };
  const onChangeValue = (value) => {
    setMedicineSearch(value);
  };
  const fetchData = async () => {
    props.showLoader();
    await axios
      .get(
        `http://localhost:4000/api/medicine/search-by-name?name=${medicineSearch}`
      )
      .then((response) => {
        console.log(response);
        setData(response.data.medicines);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };
  useEffect(() => {
    fetchData();
  }, [medicineSearch]);
  const handleEdit=(item)=>{
     setClickedMedicine(item);
     setAddModal(true);
  }
  const filterOutMedicines=(id)=>{
    let newArr=data.filter((item)=>item._id!==id);
    setData(newArr);
  }
  const handleDelete=async(id)=>{
    props.showLoader();
    await axios.delete(`http://localhost:4000/api/medicine/delete/${id}`,{withCredentials:true}).then((response)=>{
        filterOutMedicines(id);
    }).catch(err=>{
      toast.error(err?.response?.data?.error);
    }).finally(()=>{
      props.hideLoader();
    })
  }
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
        <div className="add-manage-medicine" onClick={onOffModal}>
          Add
        </div>
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
            {data.map((item, index) => {
              return (
                <div className="report-form-row">
                  <div className="">{index + 1}</div>
                  <div className="col-2-mng">{item.name}</div>
                  <div className="col-2-mng">{item?.addedBy?.name}</div>
                  <div className="col-3-mng">{item.quantity}</div>
                  <div onClick={()=>handleEdit(item)}className="edit-icon">
                    <EditIcon style={{cursor:"pointer"}}/>
                  </div>
                  <div onClick={()=>handleDelete(item._id)} className="delete-icon">
                    <DeleteIcon />
                  </div>
                </div>
              );
            })}
            {data.length === 0 && (
              <div className="report-form-row">
                <div>No Any Medicine Yet</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {addModal ? (
        <Modal
          header="Add Medicine"
          handleClose={onOffModal}
          children={<MedicineModal showLoader={props.showLoader} hideLoader={props.hideLoader} clickedMedicine={clickedMedicine}/>}
        />
      ) : null}
    </div>
  );
};
