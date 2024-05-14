import React, { useContext, useState } from 'react';
import './Navbar.css';
import assets from '../../assets/assets';
import { Link,useNavigate } from 'react-router-dom';
import { storeContext } from '../../context/StoreContext';


const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState('Home');
    const {getTotalCartAmount,token,setToken}=useContext(storeContext);

  const navigate = useNavigate();
   const logOut =()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
   }

   const handleOrder=()=>{
    navigate('/myOrders');
   }

  return (
    <div className='mainNavbar'>
    <div className='navbar'>
      <Link to={"/"}><img src={assets.logo} alt='' className='logo'/></Link>
      <ul className='navbar-menu'>
        <Link to={"/"} onClick={()=>{setMenu("Home")}} className={menu==="Home"?"active":""}>Home</Link>
        <a href="#exploreMenu" onClick={()=>{setMenu("menu")}} className={menu==="menu"?"active":""}>Menu</a>
        <a href="#app-download" onClick={()=>{setMenu("Mobile-App")}} className={menu==="Mobile-App"?"active":""}>Mobile-App</a>

        <a href="#contact" onClick={()=>{setMenu("Contact")}} className={menu==="Contact"?"active":""}>Contact Us</a>
      </ul>
      <div className='navbar-right'>

       <img src={assets.search_icon} alt='' className='Searchicon'/>
        <Link to={"/cart"} className='bag'>
        <img src={assets.bag_icon} alt='' className='Searchicon'/>
        {getTotalCartAmount()>5 &&<div className='navbar-bag-dot'></div>}
        </Link>
        {!token?<button className='SignInBtn' onClick={()=>{setShowLogin(true)}}>Sign In</button>:<div className='navbar-profile'>
        <img src={assets.profile_icon} />
        <ul className='nav-profile-dropdown'>
          <li onClick={handleOrder}>{<img src={assets.bag_icon} />}<p>Orders</p></li>
          <hr/>
          <li onClick={logOut}>{<img src={assets.logout_icon} />}<p>LogOut</p></li>
        </ul>
        </div>
        }
      </div>
    </div>
    </div>
  )
}

export default Navbar
