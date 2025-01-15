import React from 'react'
import "./Header.jsx"
import "./Header.css"
const Header = () => {
  return (
    <div className="header rounded-xl items-center h-[250px] md:h-[350px] lg:h-[450px]">
      <div className="header-content flex flex-col items-start max-w-[70%] md:max-w-[50%]">
        <h2 className="text-4xl folt-bold">Order your favorite food here</h2>
        <p className="hidden md:block text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          impedit, veniam nisi, ipsa aliquid similique mollitia exercitationem
          dolores ipsum veritatis.
        </p>
        <button className="bg-white rounded-full text-gray-800 hover:bg-gray-300 font-semibold py-1 px-8">
          visit us
        </button>
      </div>
    </div>
  );
}

export default Header
