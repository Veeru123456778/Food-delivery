import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const storeContext= createContext(null);

const StoreContextProvider=(props)=>{
    const url = "http://localhost:5000";
    const [cartItems,setCartItems]=useState({});
    const [token,setToken]=useState("");
    const [food_list,setFoodList] = useState([]);

    const addToCart= async(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

        if(token){
        const response = await axios.post(`${url}/api/cart/add`,{itemId},{headers:{token}});
    }
       
    }
    
        const getTotalCartAmount=()=>{
            let CartAmount=0;
            for(const item in cartItems){
                if(cartItems[item]>0){
                 let itemInfo = food_list.find((product)=>item===product._id);
                    CartAmount+=itemInfo.price*cartItems[item];
               }
            }
            return CartAmount;
        }
      
        useEffect(()=>{
            async function loadData(){
                await getFoodList();
                if(localStorage.getItem("token")){
                    setToken(localStorage.getItem("token"));
                    await cartData(localStorage.getItem("token"));
                }
            }
               loadData();
        },[])
    
    const removeItem= async(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));

        if(token){
         await axios.post(`${url}/api/cart/remove`,{itemId},{headers:{token}});
        }
    }

    const getFoodList = async()=>{
        const response = await axios.get(`${url}/api/food/list`);
        if(response.data.success){
        setFoodList(response.data.data);
    }
    }

    const cartData = async(token)=>{
          const response = await axios.get(`${url}/api/cart/get`,{headers:{token}});
          if(response.data.success){
            setCartItems(response.data.cartdetails);
        }
    }

    const contextValue={
   food_list,
   cartItems,
   setCartItems,
   removeItem,
   addToCart,
   getTotalCartAmount,
   url,
   token,
   setToken
    }
    return(
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>
    )
}

export default StoreContextProvider