import React from 'react'
import { assets } from '../../Assets/Assets';
import "./Footer.css"
const Footer = () => {
  return (
    <div className="footer flex flex-col text-[#d9d9d9] bg-[#323232] items-center mt-10" id='footer'>
      <div className="flex flex-col  footer-content md:grid gap-[50px] md:gap-[80px] w-full">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" className="w-12" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            ipsa, labore exercitationem nulla quis sapiente et ipsam temporibus
            voluptatibus, quia recusandae a quas animi ipsum? Est eos earum
            aliquid ut!
          </p>
          <div className="footer-social-media">
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h1>COMPANY</h1>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h1>GET IN TOUCH</h1>
          <ul>
            <li>+251966438359</li>
            <li>firaolget46@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr className="w-full mx-20" />
      <p className="text-center">
        copyright 2024 @ restaurant.com All right reserved.
      </p>
    </div>
  );
}

export default Footer
