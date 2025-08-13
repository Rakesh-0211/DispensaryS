import "./record.css";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SearchBox } from "../../../components/searchBox/searchBox";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Modal } from "../../../components/Modal/modal";
import { useEffect, useState } from "react";
import{RecordModal} from "./RecordModal/recordModal"
export const Record = () => {
  const [studentRoll, setStudentRoll] = useState("");
  const onChangeField = (value) => {
    setStudentRoll(value);
  };
  const[listOfYear,setlistOfYear]=useState([]);
  const[listOfMonth,setlistOfMonth]=useState([]);
  const[selectedYear,setSelectedYear]=useState("");
  const[selectedMonth,setSelectedMonth]=useState("");

  const currentYear=new Date().getFullYear();
  const fetchData=async()=>{

  }
  useEffect(()=>{
    if(selectedMonth===""||selectedYear===""){
      return;
    }
    fetchData();

  },[selectedYear,selectedMonth])
  useEffect(()=>{
       let arr=[];
       for(let i=2025;i<=parseInt(currentYear);i++){
           arr.unshift(i.toString());
       }
       setlistOfYear(arr);
       setSelectedYear(arr[0]);
       const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const currentMonthIndex=new Date().getMonth();
const pastAndCurrentMonths=months.slice(0,currentMonthIndex+1);
setlistOfMonth(pastAndCurrentMonths);
setSelectedMonth(pastAndCurrentMonths[pastAndCurrentMonths.length-1]);

  },[])
const[modal,setModal]=useState(false);
const onOffModal=()=>{
  setModal(prev=>!prev);
}
  return (
    <div className="records">
      <div className="go-back">
        <Link to={"/admin/dashboard"}>
          <ArrowBackIcon />
          Back To Dashboard
        </Link>
      </div>
      <SearchBox
        value={studentRoll}
        onChange={onChangeField}
        placeholder="Search By Roll No."
      />
      <div className="record-date-block">
        Select year
        <div className="record-date-year">

          {
            listOfYear.map((item,index)=>{
              return(
                   <div onClick={()=>setSelectedYear(item)}className={`record-year ${selectedYear===item?`active-state`:null}`}>{item}</div>
              )
            })
          }
           
        </div>
         Select month
         <div className="record-date-year">
           {
            listOfMonth.map((item,index)=>{
              return(
                   <div onClick={()=>setSelectedMonth(item)} className={`record-year ${selectedMonth===item?`active-state`:null}`}>{item}</div>
              )
            })
          }
          </div>
        

      </div>
        <div className="manageMedicine-card">
        <div className="report-form-rows">
          <div className="report-form-header">
            <div className="">View</div>
            <div className="col-2-mng">Student Name</div>
            <div className="col-2-mng">Roll No.</div>
            <div className="col-3-mng">Date</div>
          </div>

          <div className="report-form-row-block">
            <div className="report-form-row">
              <div className=""onClick={onOffModal}><RemoveRedEyeIcon sx={{cursor:"pointer"}}/></div>
              <div className="col-2-mng">Rakesh Kumar Barik</div>
              <div className="col-2-mng">122BT0726</div>
              <div className="col-3-mng">12-12-2025</div>
       
            </div>
            <div className="report-form-row">
              <div>No Any Medicine Yet</div>
            </div>
          </div>
        </div>
      </div>
      {
        modal?<Modal header="Records" handleClose={onOffModal} children={<RecordModal/>}/>:null
      }
    </div>
  );
};
