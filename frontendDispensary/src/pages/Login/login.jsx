
import './login.css'
import {toast,ToastContainer} from 'react-toastify'
import axios from 'axios'
import { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { ForgotModal } from '../../components/ForgotModal/forgotModal'
export const Login=(props)=>{
  const navigate=useNavigate();

  const[forgotPassword,setForgotPassword]=useState(false);
  const[loginField,setloginField]=useState({email:"",password:""});
    const handleForgotModal=()=>{
    setForgotPassword(prev=>!prev);
  }
  const[registerField,setRegisterField]=useState({
    name:"",
    email:"",
    password:"",
    roll:""
  });

  const handleOnChange=(event,key,card)=>{
    if(card==="login"){
      setloginField({
        ...loginField,
        [key]:event.target.value
      })
    }
    else{
      setRegisterField({
        ...registerField,
        [key]:event.target.value
      })
    }
  }
  const handleLogin=async()=>{
    if(loginField.email.trim()===""||loginField.password.trim()===""){
      return toast.error("Please enter the Credentials")
    }
    props.showLoader();
    await axios.post('http://localhost:4000/api/auth/login',loginField,{withCredentials:true}).then((response)=>{
      console.log(response);
      localStorage.setItem('token',response.data.token);
      localStorage.setItem('userInfo',JSON.stringify(response.data.isExist));
      localStorage.setItem('isLogin',true);
      props.handleLogin(true);
      if(response.data.isExist.email==="rb038066@gmail.com"){
          navigate('/admin/dashboard');
      }
      else{
      navigate(`/student/${response.data.isExist._id}`);
      }
    }).catch(err=>{
      toast.error(err?.response?.data?.error);
    }).finally(()=>{
      props.hideLoader()
    })
  }
  const handleRegister=async()=>{
    if(registerField.email.trim()===""||registerField.password.trim()===""||registerField.name.trim()===""||
registerField.roll.trim()===""){
     return toast.error("Please enter the credentials")
}
if(registerField.name.length<3){
  return toast.error("Name should be greater than 2 characters");
}
props.showLoader();
await axios.post('http://localhost:4000/api/auth/register',registerField).then(response=>{
 toast.success("User Registered Successfully", {
  autoClose: 3000,
 
  pauseOnHover: false
});
 


}).catch(err=>{
  toast.error(err?.response?.data?.error);
}).finally(()=>{
  props.hideLoader();
})
  
  }
  return(
   <div className='login-page'>
    <div className='login-page-card'>
      <div className='card-header-form'>Login</div>
      <div className='form-input-fields'>
        <input
          value={loginField.email}
          onChange={(event) => handleOnChange(event, 'email', 'login')}
          className='form-input'
          type='email'
          placeholder='Enter Email Id'
        />
        <input
          value={loginField.password}
          onChange={(event) => handleOnChange(event, 'password', 'login')}
          className='form-input'
          type='password'
          placeholder='Your Password'
        />
        <div className='form-btn' onClick={handleLogin}>Login</div>
      </div>
      <div className='forgot-password-link'
      onClick={handleForgotModal}>Forgot Password ?</div>
    </div>

    <div className='signup-page-card'>
      <div className='card-header-form'>Register</div>
      <div className='form-input-fields'>
        <input
          className='form-input'
          type='text'
          placeholder='Your Name'
          value={registerField.name}
          onChange={(event) => handleOnChange(event, 'name', 'register')}
        />
        <input
          className='form-input'
          type='email'
          placeholder='Enter Email Id'
          value={registerField.email}
          onChange={(event) => handleOnChange(event, 'email', 'register')}
        />
        <input
          className='form-input'
          type='password'
          placeholder='Your Password'
          value={registerField.password}
          onChange={(event) => handleOnChange(event, 'password', 'register')}
        />
        <input
          className='form-input'
          type='text'
          placeholder='Your Roll No'
          value={registerField.roll}
          onChange={(event) => handleOnChange(event, 'roll', 'register')}
        />
        <div className='form-btn' onClick={handleRegister}>Register</div>
      </div>
    </div>

    {
      forgotPassword && <ForgotModal
      showLoader={props.showLoader} hideLoader={props.hideLoader} closeModal={handleForgotModal}/>
    }
  

  </div>
  )

}