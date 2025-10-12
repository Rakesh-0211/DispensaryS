import { useEffect, useState } from "react";
import "./nearByModal.css";
import { toast } from "react-toastify";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const NearByModal = (props) => {
  const [inputField, setInputField] = useState({
    name: "",
    address: "",
    contact: "",
  });
  const handleOnChange = (event, key) => {
    setInputField({
      ...inputField,
      [key]: event.target.value,
    });
  };
  useEffect(() => {
    if (props.clickedItem) {
      setInputField({
        ...inputField,
        name: props.clickedItem.name,
        address: props.clickedItem.address,
        contact: props.clickedItem.contact,
      });
    }
  }, [props.clickedItem]);
  const updateFunction = async () => {
    await axios
      .put(
        `${backendUrl}/api/nearByHospital/update/${props.clickedItem._id}`,
        inputField,
        { withCredentials: true }
      )
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      inputField.name.trim().length === 0 ||
      inputField.address.trim().length === 0 ||
      inputField.contact.trim().length === 0
    ) {
      return toast.error("Enter all the fields");
    }
    if (props.clickedItem) {
      updateFunction();
      return;
    }

    await axios
      .post(`${backendUrl}/api/nearByHospital/add`, inputField, {
        withCredentials: true,
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      });
  };
  return (
    <div>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-form-div">
          <div className="register-input-box">
            <input
              value={inputField.name}
              onChange={(event) => handleOnChange(event, "name")}
              className="input-box-register"
              type="text"
              placeholder=" Name"
            />
          </div>
          <div className="register-input-box">
            <input
              value={inputField.address}
              onChange={(event) => handleOnChange(event, "address")}
              className="input-box-register"
              type="text"
              placeholder="Address"
            />
          </div>
          <div className="register-input-box">
            <input
              value={inputField.contact}
              onChange={(event) => handleOnChange(event, "contact")}
              className="input-box-register"
              type="text"
              placeholder="Contact No."
            />
          </div>
        </div>
        <button type="submit" className="form-btn reg-btn">
          {props.clickedItem ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};
