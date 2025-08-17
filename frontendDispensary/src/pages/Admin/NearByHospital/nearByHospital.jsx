import "./nearByHospital.css";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { Modal } from "../../../components/Modal/modal";
import { NearByModal } from "./NearByModal/nearByModal";
import axios from "axios";
import { toast } from "react-toastify";
export const NearByHospitals = (props) => {

  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const[clickedItem,setClickedItem]=useState(null);
  const onOffModal = () => {
    if(modal){
      setClickedItem(null);
    }
    setModal((prev) => !prev);
  };
  const fetchData = async () => {
    props.showLoader();
    await axios
      .get("http://localhost:4000/api/nearByHospital/get")
      .then((response) => {
        console.log(response);
        setData(response.data.hospitals);
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
    setClickedItem(item);
    setModal(true);
  }
  const filterOutData=(id)=>{
    let newArr=data.filter((item)=>item._id!==id);
    setData(newArr);
  }
  const handleDelete=async(id)=>{
     props.showLoader();
     await axios.delete(`http://localhost:4000/api/nearByHospital/delete/${id}`,{withCredentials:true}).then((response)=>{
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
        <div>Near By Hospitals</div>
        <div onClick={onOffModal} className="add-facility-btn">
          Add
        </div>
      </div>
      <div className="admin-facility-rows">
        {data.map((item, index) => {
          return (
            <div className="admin-facility-row" key={item._id}>
              <div className="admin-facility-left">
                <div className="admin-facility-title">{item.name}</div>
                <div>{item.address}</div>
                <div>{item.contact}</div>
                <div style={{ marginTop: "10px" }}>Added By:{item?.addedby?.name}</div>
              </div>
              <div className="admin-facility-btn">
                <div onClick={()=>{handleEdit(item)}}>
                  <EditIcon style={{cursor:"pointer"}} />
                </div>
                <div onClick={()=>{handleDelete(item._id)}}>
                  <DeleteIcon  style={{cursor:"pointer"}} />
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
          children={<NearByModal clickedItem={clickedItem}/>}
        />
      ) : null}
    </div>
  );
};
