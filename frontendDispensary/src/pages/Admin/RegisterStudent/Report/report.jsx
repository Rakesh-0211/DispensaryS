import { useState } from "react";
import { SearchBox } from "../../../../components/searchBox/searchBox";
import "./report.css";
import DeleteIcon from '@mui/icons-material/Delete';
export const Report = () => {
  const [searchMedicineName, setSearchMedicineName] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [stocks, setStocks] = useState([]);
  const onChange = () => {
    setSearchMedicineName(searchMedicineName);
  };
  return (
    <div className="report-register">
      <div className="medicine-suggestion-block">
        <SearchBox
          value={searchMedicineName}
          onChange={onChange}
          placeholder="Search Medicine"
        />
        {dropDown ? (
          <div className="report-dropdown">
            <div className="report-medicine-dropdown">Paracetamol</div>
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
          <div className="report-form-row">
            <div className="col-1-rm">Name</div>
            <div className="col-2-rm">10</div>
            <div className="col-3-rm"><input type="number"
            className="input-table" /></div>
            <div className="delete-icon col-4-rm"><DeleteIcon/></div>
             
          </div>
          <div className="report-form-row">
            <div>No Any Data Yet</div>
             
          </div>

        </div>
      </div>
      <div className="modal-submit">Submit</div>
    </div>
  );
};
