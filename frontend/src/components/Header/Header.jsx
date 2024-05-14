import React from 'react'
import './Header.css'
import {useNavigate} from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className='Header'>
    <div className='header-content'>
      <h1>Order Your favourite Food from here</h1>
      <p>
      Welcome to Tomato, where every order is a culinary journey! Explore our diverse menu and indulge in flavors that delight your senses. Order now and let us bring the joy of great food to your doorstep!
      </p>
      <button><a href='#exploreMenu'>View Menu</a></button>
    </div>
    </div>
  )
}

export default Header
