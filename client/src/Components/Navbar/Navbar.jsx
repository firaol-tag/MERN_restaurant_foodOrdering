import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../../Assets/Assets'
import { StoreContext } from '../../Context/StoreContext'
import "./Navbar.css"

const Navbar = ({setShowLoginPopup}) => {
  const navigate=useNavigate()
    const [menu,setMenu]=useState ("home")
    const {getTotalCartAmount,setToken,token}=useContext(StoreContext)
    const logout=()=>{
      localStorage.removeItem("token")
      setToken("")
      navigate("/")
    }
  return (
    <div className="items-center py-2">
      <div className="flex justify-between">
        <Link to={"/"}>
          {" "}
          <img src={assets.logo} className="w-12 h-8" alt="" />
        </Link>
        <ul className="hidden md:flex md:gap-4 lg:gap-6 text-center items-center navbar-menu font-bold text-gray-600">
          <Link
            to={"/"}
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active li" : "li"}
          >
            Home
          </Link>
          <a
            href="#explore_menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active li" : "li"}
          >
            Menu
          </a>
          <a
            href="#"
            onClick={() => setMenu("mobile-app")}
            className={menu === "mobile-app" ? "active li" : "li"}
          >
            Mobile app
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact")}
            className={menu === "contact" ? "active li" : "li"}
          >
            Contact
          </a>
        </ul>
        <div className="flex gap-6 text-center items-center search-icon">
          <img src={assets.searchicon} className="w-6 h-6" alt="" />
          <div>
            <Link to={"/cart"}>
              <img src={assets.basket} className="w-6 h-6" alt="" />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
          {!token ? (
            <button
              onClick={() => setShowLoginPopup(true)}
              className="bg-transparent py-1 px-8 border border-gray-600 text-gray-600 rounded-xl text-center hover:bg-gray-100 hover:text-gray-800"
            >
              Sign in
            </button>
          ) : (
            <div className="cont flex flex-col gap-4 relative">
              <img className="w-8 h-8" src={assets.profile} alt="" />
              <ul className="dropdown hidden  absolute right-0 top-8 rounded-md">
                <li
                  onClick={()=>navigate("/myorders")}
                  className="flex items-center cursor-pointer hover:text-[tomato] gap-2"
                >
                  <img className="w-4 h-4" src={assets.basket} alt="" />
                  <p>Orders</p>
                </li>
                <hr className="my-2 h-[2px] bg-gray-800" />
                <li
                  onClick={logout}
                  className="flex items-center cursor-pointer hover:text-[tomato] gap-2"
                >
                  <img className="w-4 h-4" src={assets.minus} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar
