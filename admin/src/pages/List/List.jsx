import React, { useEffect, useState } from 'react'
import "./List.css"
import axios from 'axios';
import {toast} from 'react-toastify'

const List = ({url}) => {
    const [items,setItems]=useState([]);

    const list = async ()=>{
    const response =  await axios.get(`${url}/api/food/list`);
    if(response.data.success){
    setItems(response.data.data);
}
else{
    toast.error("Error");
}
}

useEffect(()=>{
     list();
},[])


const removeHandle = async (_id) => {
    console.log(_id);
    const response = await axios.delete(`${url}/api/food/remove`, { data: { _id: _id } });
    await list();
    if (response.data.success) {
        toast.success("Product removed Successfully");
    } else {
        toast.error(response.data.message);
    }
}


  return (
    <div className='list  flex-col'>
    <p className='main-p'>All Foods List</p>
    <div className='list-table'>
        <div className='list-table-format title'>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
        </div> 
        {items.map((item,index)=>{
            return(
                <div key={item._id} className='list-table-format'>
               <img src={`${url}/images/`+ item.image} alt='' />
               <p>{item.name}</p>
               <p>{item.category}</p>
               <p>${item.price}</p>
               <p className='cursor' onClick={()=>{removeHandle(item._id)}}>X</p>
                </div>
            )
        })}
    </div>
    </div>
  )
}

export default List
