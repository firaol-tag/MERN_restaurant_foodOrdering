import React, { useContext, useState } from 'react'
import "./foodItem.css"
import {assets} from "./../../Assets/Assets"
import { StoreContext } from '../../Context/StoreContext'
const FoodItem = ({id,name,price,image,description}) => {
  // const [itemCounter,setItemCounter]=useState(0)
  // () => setItemCounter((prev) => prev + 1)
  const {cartItems,setCartItems, addCartItems,removeCartItem}=useContext(StoreContext)
  return (
    <div className="food_item w-full m-auto border-md rounded-md ">
      <div className="food-item-image-container">
        <img
          src={"https://restaurant.waratechnology.com" + image}
          alt=""
          className="food-item-image w-full h-40 "
        />

        {!cartItems[id] ? (
          <div
            onClick={() => addCartItems(id)}
            className="add p-1 absolute bg-white"
          >
            <img src={assets.add} className=" w-4" alt="" />
          </div>
        ) : (
          <div className="itemcouter bg-white rounded-full">
            <img
              src={assets.minus}
              className="w-6"
              alt=""
              onClick={() => removeCartItem(id)}
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.addg}
              className="w-6"
              alt=""
              onClick={() => addCartItems(id)}
            />
          </div>
        )}
      </div>
      <div className="food-item-info flex flex-col">
        <div className="food-item-name-rating flex items-flex justify-between mb-2">
          <p className="text-xl font-semibold">{name}</p>
          <img src="" alt="" />
        </div>
        <p className="food-item-description text-[#676767]">{description}</p>
        <p className="food-item-price my-4 font-semibold">{price} birr</p>
      </div>
    </div>
  );
}

export default FoodItem
