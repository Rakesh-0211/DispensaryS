import { useState } from 'react'
import { SearchBox } from '../../components/searchBox/searchBox'
import './stock.css'
import { TableComp } from '../../components/Table/table';
export const Stock=()=>{
  const[medicineName,setMedicineName]=useState("");
  const handleInputChange=(value)=>{
       setMedicineName(value);
  }
  const headers=["Sr No.","Name","Quantity","Usage"];
  const rowData=[
    {
      sno:1,
      name:"rakesh",
      quna:23,
      usage:'fever'
  
    }
  ]
  return(
    <div className='stock-page'>
        <SearchBox placeholder="Search Medicine" value={medicineName} onChange={handleInputChange}/>
      <div className='stock-page-card'>
        <TableComp header={headers} data={rowData}/>

      </div>
    </div>
  )
}