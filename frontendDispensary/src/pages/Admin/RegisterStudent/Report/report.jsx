import { useState } from "react";
import { SearchBox } from "../../../../components/searchBox/searchBox";
import "./report.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
export const Report = (props) => {
  const [searchMedicineName, setSearchMedicineName] = useState("");
  const [data, setData] = useState([]);
  const [dropDown, setDropDown] = useState(false);
  const [selectMedicine, setSelectMedicine] = useState([]);
  const onChange = (value) => {
    setSearchMedicineName(value);
  };
  const fetchData = async () => {
    await axios
      .get(
        `http://localhost:4000/api/medicine/search-by-name?name=${searchMedicineName}`
      )
      .then((response) => {
        console.log(response);
        setData(response.data.medicines);
        setDropDown(true);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
        setDropDown(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [searchMedicineName]);
  const addMedicine = (item) => {
    let exist = 0;
    selectMedicine.map((it) => {
      if (item._id === it._id) {
        exist = 1;
      }
    });
    item = { ...item, requiredQuantity: "" };
    if (exist === 0) {
      setSelectMedicine([...selectMedicine, item]);
      setSearchMedicineName("");
      setDropDown(false);
    }
  };
  const onChangeHandle=(event,ind)=>{
    const arr=selectMedicine.map((item,index)=>{
      if(index===ind){
        if(parseInt(item.quantity)<parseInt(event.target.value)){
           toast.error("You have not that much medicine in the store")
        }
        return {...item,requiredQuantity:event.target.value}
      }
      return{...item}
    })
    setSelectMedicine(arr);
  }
  const handleDelete=(item)=>{
    let arr=selectMedicine.filter((it)=>item!==it._id);
    setSelectMedicine(arr);
  }
  const checkInputInValid=()=>{
    let invalid=false;
    selectMedicine.map((item)=>{
      if(item.requiredQuantity.trim().length===0){
        invalid=true;
      }
    })
    return invalid;
  }
  const handleOnSubmit=async()=>{
     if(selectMedicine.length===0){
      return toast.error("Please select any medicine");
     }
     if(checkInputInValid()){
      return toast.error("Please enter all the fields")
     }
     await axios.post('http://localhost:4000/api/history/add',{roll:props.studentDetail.roll,student:props.studentDetail._id,medicines:selectMedicine},
      {withCredentials:true}
     ).then(response=>{
         toast.success(response.data.message);
         setTimeout(()=>{
          props.handleCloseModal()
         },1000)
     }).catch(err=>{
      toast.error(err?.response?.data?.error);
     })
  }
  return (
    <div className="report-register">
      <div className="medicine-suggestion-block">
        <SearchBox
          value={searchMedicineName}
          onChange={onChange}
          placeholder="Search Medicine"
        />
        {dropDown && searchMedicineName.trim().length != 0 ? (
          <div className="report-dropdown">
            {data.map((item) => {
              return (
                <div
                  className="report-medicine-dropdown"
                  onClick={() => addMedicine(item)}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="report-form-rows">
        <div className="report-form-header">
          <div className="col-1-rm  ">Medicine Name</div>
          <div className="col-2-rm">Quantity Left</div>
          <div className="col-3-rm">Required Quantity</div>
          <div className="col-4-rm">Delete</div>
        </div>

        <div className="report-form-row-block">
          {selectMedicine.map((item, index) => {
            return (
              <div className="report-form-row">
                <div className="col-1-rm">{item.name}</div>
                <div className="col-2-rm">{item.quantity}</div>
                <div className="col-3-rm">
                  <input type="number" 
                  value={selectMedicine[index].     requiredQuantity}
                  onChange={(event)=>onChangeHandle(event,index)}
                  className="input-table" />
                </div>
                <div className="delete-icon col-4-rm"
                  onClick={()=>handleDelete(item._id)}>
                  <DeleteIcon />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="modal-submit" onClick={handleOnSubmit}>Submit</div>
    </div>
  );
};
