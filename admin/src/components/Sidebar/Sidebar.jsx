import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='side-bar'>
    <div className='sidebar-options'>
    <NavLink to={"/add"} className='options'>
   <img className='add-img' src={assets.add_icon}/>
   <p>Add Items</p>
    </NavLink>
    <NavLink to={"/list"} className='options'>
    <img className='add-img' src={assets.order_icon}/>
   <p>List Items</p>
    </NavLink>
    <NavLink to={"/orders"} className='options'>
    <img className='add-img' src={assets.order_icon}/>
   <p>Orders</p>
    </NavLink>

    </div>
    </div>
  )
}

export default Sidebar


