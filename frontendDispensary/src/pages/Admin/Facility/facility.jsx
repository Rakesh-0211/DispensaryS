import "./facility.css";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect, use } from "react";
import axios from "axios";
import { Modal } from "../../../components/Modal/modal";
import { FacilityModal } from "./facilityModal/facilityModal";
import { toast } from "react-toastify";
export const Facility = (props) => {
  const [modal, setModal] = useState(false);
  const[clickedItems,setClickedItems]=useState(null);
  const [data, setData] = useState([]);
  const onOffModal = () => {
    if(modal){
      setClickedItems(null);
    }
    setModal((prev) => !prev);
  };
  const fetchData = async () => {
    props.showLoader();
    await axios
      .get("http://localhost:4000/api/facility/get")
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
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
  }, []);
  const handleEdit=(item)=>{
     setClickedItems(item);
     setModal(true);
  }
  const filterOutData=(id)=>{
    let newArr=data.filter(item=>item._id!==id);
    setData(newArr);
  }
  const handleDelete=async(id)=>{
     props.showLoader();
     await axios.delete(`http://localhost:4000/api/facility/delete/${id}`,{withCredentials:true}).then((response)=>{
      filterOutData(id);
     }).catch(err=>{
      toast.error(err?.response?.data?.error);
     }).finally(()=>{
      props.hideLoader();
     })
  }
  return (
    <div className="admin-facility">
      <div className="go-back">
        <Link to={"/admin/dashboard"}>
          <ArrowBackIcon />
          Back To Dashboard
        </Link>
      </div>
      <div className="admin-facility-header">
        <div>Facilities</div>
        <div onClick={onOffModal} className="add-facility-btn">
          Add
        </div>
      </div>
      <div className="admin-facility-rows">
        {data.map((item) => {
          return (
            <div className="admin-facility-row">
              <div className="admin-facility-left">
                <div className="admin-facility-title">{item.title}</div>
                <div>
                  {item.description}
                </div>
                <div style={{ marginTop: "10px" }}>Added By :{item?.addedby?.name}</div>
              </div>
              <div className="admin-facility-btn">
                <div onClick={()=>handleEdit(item)}>
                  <EditIcon style={{cursor:"pointer"}}/>
                </div>
                <div onClick={()=>handleDelete(item._id)}>
                  <DeleteIcon style={{cursor:"pointer"}}/>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {modal ? (
        <Modal
          header="Add Facility"
          handleClose={onOffModal}
          children={<FacilityModal clickedItem={clickedItems}/>}
        />
      ) : null}
    </div>
  );
};
