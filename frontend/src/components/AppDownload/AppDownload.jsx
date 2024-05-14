import assets from '../../assets/assets'
import './AppDownload.css'

import React from 'react'

const AppDownload = () => {
  return (
    <div className='AppDownload' id='app-download'>
    <div className='AppDownloadContent' >
      <p className='appDown'>For Better Experience Download </p><p>Tomato App</p>
      <div className='imagesDownload'>
      <img src={assets.play_store} alt=''/>
      <img src={assets.app_store} alt=''/>
      </div>
    </div>
    </div>
  )
}

export default AppDownload
