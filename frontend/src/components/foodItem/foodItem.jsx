import React, { useContext } from 'react'
import './foodItem.css'
import assets from '../../assets/assets'
import { storeContext } from '../../context/StoreContext';

const FoodItem = (props) => {

  const {cartItems,removeItem,addToCart,url} = useContext(storeContext);
  
   const id=props.itemProp._id;

   const imageUrl = `${url}/images/${props.itemProp.image}`;
return (
  <div className='mainFoodItem'>
    <div className='food-item-container'>
    <div className='food-item-image-container'>
        <img  className='food-item-image' src={imageUrl}/>
        
        {!cartItems[id]
        ? <img className="addOne" onClick={()=>addToCart(id)} src={assets.add_icon_white}/>
        :<div className='item-counter'>
          <img className="remove" onClick={()=>removeItem(id)} src={assets.remove_icon_red} />
          <p>{cartItems[id]}</p>
          <img className="add" onClick={()=>addToCart(id)} src={assets.add_icon_green} />
        </div>}
    </div>

      <div className='food-item-info'>
        <div className='food-item-rating'>
            <p className='food-item-name'>{props.itemProp.name}</p>
            <img src={assets.rating_starts} alt=''/>
        </div>
        <p className='food-item-desc'>{props.itemProp.description}</p>
        <p className='food-item-price'>${props.itemProp.price}</p>
      </div>
    </div>
    </div>
  )
}

export default FoodItem
