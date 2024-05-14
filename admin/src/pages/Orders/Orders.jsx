import React from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import {toast} from 'react-toastify'
import {assets} from '../../assets/assets.js'

const Orders = ({url}) => {
  const [orders,setOrders] = useState([]);
  const [status,setStatus] =useState('Food Processing');

  const fetchOrders = async()=>{
   const response = await axios.get(`${url}/api/order/list`);
   if(response.data.success){
   setOrders(response.data.data);
  }
  else{
   toast.error("Error");
  }
  }

  useEffect(()=>{
    fetchOrders();
  },[])

  const handleOnSelect = async(event,orderId)=>{
    const response=await axios.post(`${url}/api/order/status`,{orderId:orderId,status:event.target.value});
    if(response.data.success){
      await fetchOrders();
    }
  }


  return (
    <div className='order '>
      <h3>Order Page</h3>
      <div className='order-list'>
        {orders.map((order,index)=>{
         return <div key={index} className='order-item'>
         <img src={assets.parcel_icon} alt=''/>
         <div>
          <p className='order-items-food'>{order.items.map((item,index)=>{
          if(index===order.items.length-1){
            return item.name + " x " + item.quantity
          }
          else{
            return item.name + " x " + item.quantity+", "
          }
          })}</p>
          <p className='order-user-name'>{order.address.firstname+" "+order.address.lastname}</p>
          <div className='order-item-address'>
            <p>{order.address.street+", "}</p>
            <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipCode}</p>
          </div>
          <p className='user-phone'>{order.address.phone}</p>
         </div>
         <p>Items: {order.items.length}</p>
         <p>${order.amount}.00</p>
         <select key={index} value={order.status} onChange={(event)=>{handleOnSelect(event,order._id)}}>
          <option value="Food Processing">Food Processing</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
         </select>
          </div>
        })}
      </div>
    </div>
  )
}

export default Orders
