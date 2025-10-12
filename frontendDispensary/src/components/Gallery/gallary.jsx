import "./gallary.css";
import axios from "axios";
import { useState, useEffect } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const Gallary = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      props.showLoader();
      await axios
        .get(`${backendUrl}/api/gallary/get`)
        .then((response) => {
          setData(response.data.images);
        })
        .catch((err) => {
          console.log(err);
        }).finally(()=>{
          props.hideLoader();
        })
    };
    fetchData();
  },[]);
  return (
    <div className="gallary-home">
      {data.map((item, index) => {
        return (
          <div key={index}className="gallary-home-image-block">
            <img
              className="gallary-home-image"
              src={item.link}
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
};
