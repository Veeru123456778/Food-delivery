import React, { useEffect } from 'react'
import "./verify.css"
import { useSearchParams,useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { storeContext } from '../../context/StoreContext';
import axios from "axios"

const verify = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {url} = useContext(storeContext);
    const navigate =useNavigate();

    const verifyPayment = async ()=>{
        const response = await axios.post(`${url}/api/order/verify`,{success,orderId});
        if(response.data.success){
            navigate("/myOrders");
        }
        else{
            navigate("/");
        }
    }

    useEffect(()=>{
     verifyPayment();
    },[])
  return (
    <div className='verify'>
    <div className='spinner'>
        
    </div>
    </div>
  )
}

export default verify
