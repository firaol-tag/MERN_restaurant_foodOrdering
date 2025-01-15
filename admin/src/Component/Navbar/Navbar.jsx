import React from 'react'
import {assets} from "./../../Assets/Assets"
import "./Navbar.css"
const Navbar = () => {
  return (
    <div className="navbar flex justify-between items-center p-2">
      <div className="flex flex-col">
        <img src={assets.logo} className="w-12 h-12" alt="" />
        <p>Admin Panel</p>
      </div>
      <img src={assets.profilepic} className="w-12 h-12" alt="" />
    </div>
  );
}

export default Navbar
