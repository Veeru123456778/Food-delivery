import React, {  useState } from 'react'
import './Add.css'
import { assets, url } from '../../assets/assets'
import axios from 'axios'
import {toast} from 'react-toastify'

const Add = ({url}) => {

    const [image,setImage] = useState(false);
    const [data,setdata]=useState({
        name:"",
        description:"",
        category:"",
        price:null
    })

    const onSubmitHandler= async (event)=>{
    event.preventDefault();

    const formData=new FormData();
    formData.append("name",data.name);
    formData.append("description",data.description);
    formData.append("category",data.category);
    formData.append("price",data.price);
    formData.append("image",image);

    const response = await axios.post(`${url}/api/food/add`,formData);
    console.log(response);
    if(response.data.success){
        setdata({
            name:"",
            description:"",
            category:"",
            price:null
        })
        setImage(false);
        toast.success(response.data.message);
    }
    else{
       toast.error(response.data.message);
    }
    }

  return (
    <div className='add'>
    <form className='form-add' onSubmit={onSubmitHandler}>
    <div className='add-img-upload flex-col'>
    <p>Upload Image</p>
      <label htmlFor='image' ><img src={image?URL.createObjectURL(image):assets.upload_area} /></label>
      <input type='file' onChange={(e)=>{setImage(e.target.files[0])}} id='image' hidden required/>
      </div>
    <div className='add-product-name flex-col'>
    <p>Product Name</p>
      <input onChange={(e)=>{setdata(prev=>({...prev,name:e.target.value}))}} type='text' name='name' placeholder='Product name' required/>
      </div>

    <div className='add-product-description flex-col'>
    <p>Product Description</p>
    <textarea onChange={(e)=>{setdata(prev=>({...prev,description:e.target.value}))}} name='description' rows="6" placeholder='Write Content here' required/>
    </div>
    <div className='product-category-price '>
    <div className='add-category flex-col'>
    <p>Product Category</p>
     <select name='category' onChange={(e)=>{setdata(prev=>({...prev,category:e.target.value}))}}>
<option value="Salad">Salad</option>
<option value="Rolls">Rolls</option>
<option value="Sandwich">Sandwich</option>
<option value="Cake">Cake</option>
<option value="Deserts">Deserts</option>
<option value="Pure Veg">Pure Veg</option>
<option value="Pasta">Pasta</option>
<option value="Noodles">Noodles</option>
     </select>
    </div>
    <div className='add-price flex-col'>
        <p>Product price</p>
        <input onChange={(e)=>{setdata(prev=>({...prev,price:e.target.value}))}} type='Number' name='price' placeholder='Product Price' required/>
    </div>
    </div>
    <button type='submit' className='add-btn'>ADD</button>
    </form>
    </div>
  )
}

export default Add
