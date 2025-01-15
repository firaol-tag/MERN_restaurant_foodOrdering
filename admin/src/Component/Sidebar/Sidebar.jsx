import React from "react";
import { assets } from "./../../Assets/Assets";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar w-[18%] h-screen">
      <div className="sidebar-options flex flex-col gap-3 pt-2">
        <NavLink to="/add" className="sidebar-option flex justify-between items-center p-2 px-4 cursor-pointer">
          <img src={assets.add} alt="" className="w-8 h-8" />
          <p className="hidden md:block">Add</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option flex justify-between items-center p-2 px-4 cursor-pointer">
          <img src={assets.basket} alt="" className="w-8 h-8" />
          <p className="hidden md:block">List</p>
        </NavLink>
        <NavLink to="/manageorder" className="sidebar-option flex justify-between items-center p-2 px-4 cursor-pointer">
          <img src={assets.basket} alt="" className="w-8 h-8" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
