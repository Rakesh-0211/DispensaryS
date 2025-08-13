import { TableComp } from '../Table/table'
import { useState,useEffect } from 'react';
import axios from 'axios';
import './near-By-Hospitals.css'
export const NearByHospitals=(props)=>{
  const hospitalheaders=['Sn No.','Name','Address','Contact'];
    const [rowData,setRowData]=useState([]);
    const getFormattedData=(data)=>{
      let newarr=data.map((item,ind)=>{
           return{
             srNo:ind+1,
             name:item.name,
             address:item.address,
             contact:item.contact
           }
      })
      setRowData(newarr);
    }
    useEffect(()=>{
         props.showLoader();
         const fetchData= async()=>{
          await axios.get('http://localhost:4000/api/nearByHospital/get').then((response)=>{
             getFormattedData(response.data.hospitals);
          }).catch(err=>{
            console.log(err);
          }).finally(()=>{
            props.hideLoader();
          })
         }
         fetchData();
    },[])
     return(
      <div>
        <TableComp header={hospitalheaders} data={rowData}/>
      </div>
     )
}