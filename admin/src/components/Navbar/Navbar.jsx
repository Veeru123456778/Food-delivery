import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets.js'

const Navbar = () => {
  return (
    <div className='admin-navbar'>
      <img className='admin-image' src={assets.logo}/>
      <img className='admin-profile' src={assets.profile_image}/>
    </div>
  )
}

export default Navbar
