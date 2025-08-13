
import { useEffect, useState } from 'react'
import { TableComp } from '../Table/table'
import './staff.css'
import axios from 'axios'
export const Staff=(props)=>{
   const staffHeader=["Name","Designation","Email Id","Contact No."]
   const [rowData,setRowData]=useState([]);
   const getFormattedData=(data)=>{
    let newarr=data.map((item) =>{
      return{
        name:item.name,
        designation:item.designation,
        email:item.email,
        contactNo:item.mobileNo
      }
      
    })
    setRowData(newarr);
   }
   const fetchData=async()=>{
      props.showLoader();
      await axios.get("http://localhost:4000/api/auth/get-staff").then((response)=>{
        console.log(response);
        getFormattedData(response.data.staffs)
      }).catch((err)=>{
        console.log(err);
      }).finally(()=>{
          props.hideLoader();
      })
   }
   useEffect(()=>{
      fetchData();
   },[])
   return(
    <div className='staff'>
      <TableComp header={staffHeader} data={rowData||[]}/>
    </div>
   )
}