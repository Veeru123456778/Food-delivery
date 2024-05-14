import React ,{useContext, useEffect, useState} from 'react'
import './PlaceOrder.css'
import { storeContext } from '../../context/StoreContext'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(storeContext);
  const navigate = useNavigate();

  const [data,setData] = useState({
    firstname:"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    phone:""
  });

  const handleOnChange = (event)=>{
   event.preventDefault();
   const name = event.target.name;
   const value = event.target.value;
   setData(prev=>({...prev, [name]:value}));
  }
 
  const placeOrder = async(event)=>{
  event.preventDefault();  //it will not reload the webpage whenever we are submitting the form
  let orderItems = [];
  food_list.map((item)=>{
  if(cartItems[item._id]>0){
    console.log(item);
    let itemInfo = item;
    itemInfo["quantity"]= cartItems[item._id];
    orderItems.push(itemInfo);
  }
  })
  let orderData = {
    address:data,
    items:orderItems,
    amount:getTotalCartAmount()+5,
  }
  let response = await axios.post(`${url}/api/order/place`,orderData,{headers:{token}})
  console.log(response.data);
  if(response.data.success){
  const {session_url} = response.data;
  window.location.replace(session_url);
  }
  }
   
  useEffect(()=>{
    if(!token){
     navigate('/cart');
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart');
    }
  },[token])

  return (
    <div className='main-place-order'>
        <form onSubmit={placeOrder} className='place-order-form'>
      <div className='place-order-left'>
        <p>Delivery Information</p>
        <div className='multi-fields'>

          <input required onChange={handleOnChange} type='text' name='firstname' value={data.firstname} className='first-name'  placeholder='First Name'/>
          <input required onChange={handleOnChange}  type='text' name='lastname' value={data.lastname}  className='last-name' placeholder='Last Name'/>
        </div>
        <input required onChange={handleOnChange} name='email' value={data.email}  type='email' className='email' placeholder='Email address'/>
        <input required onChange={handleOnChange} name='street' value={data.street} type='text' className='street' placeholder='Street'/>
        <div className='multi-fields'>
          <input required onChange={handleOnChange} name='city' value={data.city}  type='text' className='city' placeholder='City'/>
          <input required onChange={handleOnChange}  name='state' value={data.state}  type='text' className='state' placeholder='State'/>
        </div>
        <div className='multi-fields'>
          <input required onChange={handleOnChange} name='zipCode' value={(data.zipCode)}  type='number' className='zip' placeholder='ZipCode'/>

          <input required onChange={handleOnChange} name='country' value={data.country}  type='text' className='country' placeholder='Country'/>
        </div>
        <input required onChange={handleOnChange} name='phone' value={(data.phone)}  type='number' className='phone' placeholder='Phone'/>

      </div>

      <div className='place-order-right'>
      <div className='cart-total'>
      <h1>Cart Totals</h1>
       <div className='cart-total-details'>
        <p>Subtotal</p>
        <p>${getTotalCartAmount()}</p>
       </div>
       <hr/>
       <div className='cart-total-details'>
       <p>Delivery Fee</p>
       <p>${getTotalCartAmount()===0?0:5}</p>
       </div>
       <hr/>
       <div className='cart-total-details'>
       <p>Total</p>
       <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+5}</p>
       </div>
       <button type='submit' >PROCEED TO PAYMENT</button>
    </div>
  

      </div>
    </form>
    </div>

  )
}

export default PlaceOrder
