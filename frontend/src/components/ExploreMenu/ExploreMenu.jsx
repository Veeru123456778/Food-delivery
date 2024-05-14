import React from 'react'
import './ExploreMenu.css'
import {menu_list} from '../../assets/assets.js'

const ExploreMenu = (props) => {


  return (
    <div className='exploreMenu' id='exploreMenu'>
      <h1>Explore Our Menu</h1>
      <p className='exploreMenu-text'>Welcome to Tomato, where every order is a culinary journey! Explore our diverse menu and indulge in flavors that delight your senses. Order now and let us bring the joy of great food to your doorstep!</p>

      <div className='exploreMenu-list'>
     {menu_list.map((menu_item,index)=>{
       return (
        <div onClick={()=>props.setCategory(prev=>prev===menu_item.menu_name?"All":menu_item.menu_name)} className='menu-list-item' key={index}>
        <img className={props.category===menu_item.menu_name?"active":""} src={menu_item.menu_image} alt='' />
        <p>{menu_item.menu_name}</p>
        </div>
       )
         })}
      </div>
      <hr/>
    </div>
  )
}

export default ExploreMenu
