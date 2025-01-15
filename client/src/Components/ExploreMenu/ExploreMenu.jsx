import React from 'react'
import {menu_list} from "./../../Assets/Assets"
import "./ExploreMenu.css"
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className="explore_menu flex flex-col gap-4" id="explore_menu">
      <h1 className="text-[#262626] text-2xl font-bold">Explore Our Menu</h1>
      <p className="max-w-3/5 text-[#262626]">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. ipsa expedita
        reprehenderit neque necessitatibus nisi accusantium tempora!
      </p>
      <div className="menu_list flex justify-between items-center text-center p-4 ">
        {menu_list.map((item, index) => (
          <div
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "all" : item.menu_name
              )
            }
            key={index}
            className=" list_items"
          >
            <img
              src={item.menu_image}
              className={
                category===item.menu_name ? "active w-24 " : "w-24 "
              }
              alt=""
            />
            <p className="py-1 mt-4">{item.menu_name}</p>
          </div>
          
        ))}
        <hr />
      </div>
    </div>
  );
}

export default ExploreMenu
