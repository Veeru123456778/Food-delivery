import assets from "../../assets/assets.js"
import "./footer.css"
import React from 'react'

const Footer = () => {
  return (
   <div className="footerContainer">
    <div className="footer" id="contact">
      <div className="logoFooter">
        <img className="logoFooter-image" src={assets.logo}/>
        <p className="footer-text">With Tomato, discover a world of culinary possibilities, delivered right to your door, hassle-free.</p>
        <div className="social-media">
            <img src={assets.facebook_icon} className="facebook-icon"/>
            <img src={assets.twitter_icon} className="twitter_icon"/>
            <img src={assets.linkedin_icon} className="linkedin_icon"/>
        </div>
      </div>

      <div className="company">
      <h3>COMPANY</h3>
       <ul className="company-list"> 
        <li>Home</li>
        <li>About Us</li>
        <li>Delivery</li>
        <li>Privacy Policy</li>
       </ul>
      </div>
      <div className="get-in-touch">
      <h3>GET IN TOUCH</h3>
      <div className="contact-info">
       <p className="phoneNo">+928-337-182</p>
       <p className="email">contact@tomato.food</p>
       </div>
      </div>
      </div>
      <hr className="footer-divider" /> {/* Horizontal ruler */}
      <p className="copyright">Copyright 2024 &copy; Tomato.com - All Rights Reserved</p>
    </div>
  )
}

export default Footer
