import { Header } from "./components/header/header";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Login } from "./pages/Login/login";
import { Footer } from "./components/footer/footer";
import { Stock } from "./pages/Stock/stock";
import { AdminDashboard } from "./pages/Admin/Dashboard/adminDashboard";
import { RegisterStudent } from "./pages/Admin/RegisterStudent/registerStudent";
import { ManageMedicine } from "./pages/Admin/ManageMedicine/manageMedicine";
import { Record } from "./pages/Admin/Record/record";
import { Facility } from "./pages/Admin/Facility/facility";
import { NearByHospitals } from "./pages/Admin/NearByHospital/nearByHospital";
import { AdminGallary } from "./pages/Admin/Gallary/adminGallary";
import GlobalLoader from "./components/GlobalLoader/globalLoader";
import { useState } from "react";
import { ToastContainer,toast } from "react-toastify";
function App() {
  const[loader,setLoader]=useState(false);
  const showLoader=()=>{
    setLoader(true);
  }
  const hideLoader=()=>{
    setLoader(false);
  }
  const[isLogin,setLogin]=useState(localStorage.getItem("isLogin"));
  const handleLogin=(value)=>{
    setLogin(value);
  }
  return (
    <div className="App">
      <Header isLogin={isLogin} showLoader={showLoader}
      hideLoader={hideLoader} handleLogin={handleLogin}/>
      <Routes>
        <Route path="/" element={<Home showLoader={showLoader} hideLoader={hideLoader}/>}></Route>
        <Route path="/login" element={<Login handleLogin={handleLogin}
        showLoader={showLoader} hideLoader={hideLoader}/>}></Route>
        <Route path="/stock" element={<Stock
        showLoader={showLoader} hideLoader={hideLoader} />}></Route>
        <Route path="/admin/dashboard" element={<AdminDashboard
        showLoader={showLoader} hideLoader={hideLoader} />}></Route>
        <Route path="/admin/register-student" element={<RegisterStudent 
        showLoader={showLoader} hideLoader={hideLoader}/>} />
        <Route path="/admin/manage-medicine" element={<ManageMedicine 
        showLoader={showLoader} hideLoader={hideLoader}/>} />
        <Route path="/admin/record" element={<Record 
        showLoader={showLoader} hideLoader={hideLoader}/>} />
        <Route path="/admin/facility" element={<Facility showLoader={showLoader} hideLoader={hideLoader}/>} />
        <Route path="/admin/nearByHospital" element={<NearByHospitals 
        showLoader={showLoader} hideLoader={hideLoader}/>} />
        <Route path="/admin/gallary" element={<AdminGallary
        showLoader={showLoader} hideLoader={hideLoader}/>}/>
      </Routes>
      <Footer />
      {
        loader&& <GlobalLoader/>
      }
      <ToastContainer/>
     
    </div>
  );
}

export default App;
