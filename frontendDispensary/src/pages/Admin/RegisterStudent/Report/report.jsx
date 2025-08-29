import { useState } from "react";
import { SearchBox } from "../../../../components/searchBox/searchBox";
import "./report.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
export const Report = () => {
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
                <div className="col-1-rm">Name</div>
                <div className="col-2-rm">10</div>
                <div className="col-3-rm">
                  <input type="number" className="input-table" />
                </div>
                <div className="delete-icon col-4-rm">
                  <DeleteIcon />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="modal-submit">Submit</div>
    </div>
  );
};
