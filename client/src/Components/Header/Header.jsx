import React from 'react'
import "./Header.jsx"
import "./Header.css"
const Header = () => {
  return (
    <div className="header rounded-xl items-center h-[250px] md:h-[350px] lg:h-[450px] ">
      <div className="bg-black bg-opacity-60 p-5 rounded-lg w-full h-full">
        <div className="header-content flex flex-col items-start max-w-[70%] md:max-w-[50%] ">
          <h2 className="text-4xl font-bold">Order your favorite food here</h2>
          <p className="hidden md:block text-xl ">
            Discover a variety of mouthwatering dishes crafted with the freshest
            ingredients and bursting with flavor. Indulge in a culinary
            experience like no other!
          </p>
          <button className="bg-white rounded-full text-gray-800 hover:bg-gray-300 font-semibold py-1 px-8">
            visit us
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header
