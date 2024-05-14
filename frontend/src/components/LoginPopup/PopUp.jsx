import "./PopUp.css"
import React, { useState } from 'react'
import axios from 'axios'
import { useContext } from "react"
import { storeContext } from "../../context/StoreContext"

const PopUp = ({setShowLogin}) => {
  
  const {url,setToken} =useContext(storeContext);
  const [state,setState]= useState("Login");

  const [data,setData] =useState({
    name:"",
    email:"",
    password:"",
  });
const handleEmail=(event)=>{
    setData(prev=>({...prev,email:event.target.value}));
}
const handleName=(event)=>{
    setData(prev=>({...prev,name:event.target.value}));
}
const handlePassword=(event)=>{
    setData(prev=>({...prev,password:event.target.value}));
}

const onLogin = async (event)=>{
  event.preventDefault();

  let newURL =url;
  if(state=="Login"){
    newURL+="/api/user/login";
  }
  else{
    newURL+="/api/user/register";
  }

  const res = await axios.post(newURL,data);
  if(res.data.success){
    setToken(res.data.token);
    localStorage.setItem("token",res.data.token);
    setShowLogin(false);
  }
  else{
    alert(res.data.message);
  }
}

   
  return (
    <div className="popup-overlay">
    <div className="login-popUp">
    <form onSubmit={onLogin} className="login-popUp-content">
    <div className="login-header">
      <h3>{state}</h3>
      <div className="close-login" onClick={()=>{setShowLogin(false)}}>&times;</div>
      </div>

      {state=="Sign Up" && <input onChange={handleName} value={data.name} required className='login-text' type="text" placeholder="Your Name"/>}
      <input onChange={handleEmail} value={data.email}  required className='login-email' type="email" placeholder="Your Email"/>
      <input  onChange={handlePassword} value={data.password} required className='login-password' type="password" placeholder="Password"/>
      <button type="submit">{state}</button>
    
      <div className="policy-agree">
      <input type="checkbox" required/>
      <p>By Continuing, i agree to the terms of use and privacy policy.</p>
      </div>
      {state=="Login"?
      <p className="create-account">Create a New Account?<a href="#" onClick={()=>setState("Sign Up")}> Click here</a></p>:
      <p className="create-account">Already Have an Account?<a href="#" onClick={()=>setState("Login")}> Login here</a></p>}
    </form>      
</div>
    </div>
  )
}

export default PopUp
