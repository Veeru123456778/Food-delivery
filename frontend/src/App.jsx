import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/footer'
import PopUp from './components/LoginPopup/PopUp'
import Verify from './pages/verify/verify.jsx'
import MyOrders from './pages/myOrders/myOrders.jsx'

const App = () => {
  const [showLogin,setShowLogin]=useState(false);

  return (
    <div className='mainApp'>
     { showLogin && <PopUp setShowLogin={setShowLogin}/>}
    <div className='app'>
      <Navbar showLogin={showLogin} setShowLogin={setShowLogin}/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/placeOrder' element={<PlaceOrder/>}/>
      <Route path='/verify' element={<Verify />}/>
      <Route path='/myOrders' element={<MyOrders />}/>
      </Routes>
      <Footer/>
    </div>
    </div>
  )
}

export default App
