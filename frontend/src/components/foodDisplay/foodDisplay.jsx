import React, { useContext } from 'react'
import './foodDisplay.css'
import { storeContext } from '../../context/StoreContext'
import FoodItem from '../foodItem/foodItem';

const FoodDisplay = (props) => {
    const {food_list} = useContext(storeContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes Near You</h2>
      <div className='food-display-list'>
        {food_list.map((food_list_item,index)=>{
          if(props.category=="All" || props.category==food_list_item.category){
          return(  <FoodItem key={index} itemProp={food_list_item} />)
          }
        
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
