import "./facilities.css";
import { useState, useEffect } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const Facilities = (props) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    props.showLoader();
    await axios
      .get(`${backendUrl}/api/facility/get`)
      .then((response) => {
        console.log(response);
        setData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      }).finally(()=>{
        props.hideLoader();
      })
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="facility">
      <div className="facility-header">
        List of facilities available at NIT HEALTH CENTRE:
      </div>
      <div className="facility-lists">
        {data.map((item, index) => {
          return (
            <div className="facility-list">
              <div className="facility-list-header">{item.title}</div>
              <div className="facility-list-value">{item.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
