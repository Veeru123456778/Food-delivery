import React, { useContext, useState } from 'react'
import { storeContext } from '../../context/StoreContext'
import "./Cart.css"
import {useNavigate} from 'react-router-dom'

const Cart = () => {
  const {cartItems,food_list,removeItem,getTotalCartAmount,url}=useContext(storeContext);
    const navigate = useNavigate();

  return (
    <div className='cart'>
    <div className='cart-items'>
    <div className='cart-items-title'>
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
    </div>
    <br/>
    <hr/>
    <center >{getTotalCartAmount()===0 && <h1>Your cart is Empty!!</h1>}</center>

    {food_list.map((item,index)=>{
      const total=cartItems[item._id]*item.price;
      const id=item._id;
    if(cartItems[item._id]>0){
     return(
      <div className='cart-item'>
      <div className='cart-items-title cart-items-item'>
        <img src={url+"/images/"+item.image} alt=''/>
        <p>{item.name}</p>
        <p>${item.price}</p>
        <p>{cartItems[id]}</p>
        <p>${total}</p>
        <p onClick={()=>{removeItem(id)}} className='cross'>x</p>
      </div>
      <hr/>
      </div>
     )
    }
    })}
    </div>
    
    <div className='cart-bottom'>
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
       <button onClick={()=>{navigate("/placeOrder")}}>PROCEED TO CHECKOUT</button>
    </div>
    <div className='promo-code'>
    <div className='promo-code-text'>
    <p>If you have a promo code, Enter it here</p>
    </div>
    <div className='promo-code-details'>
    <input type='text' placeholder='promo code'/>
    <button type='submit'>Submit</button>
    </div>
    </div>

    </div>
    </div>
  )
}

export default Cart
