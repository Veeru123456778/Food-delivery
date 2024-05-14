import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/foodDisplay/foodDisplay.jsx'
import Footer from '../../components/Footer/footer.jsx'
import AppDownload from '../../components/AppDownload/AppDownload.jsx'

const Home = () => {
    const [category,setCategory]=useState('All');

  return (
    <div className='MainHome'>
    <div className='Home'>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>
    </div>
  )
}

export default Home
