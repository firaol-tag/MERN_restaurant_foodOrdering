import React, { useContext } from 'react'
import {useNavigate} from "react-router-dom"
import { StoreContext } from '../../Context/StoreContext'
import "./Cart.css"
const Cart = () => {
  const { cartItems, food_list, removeCartItem, getTotalCartAmount } =
    useContext(StoreContext);
  const navigate=useNavigate()
  return (
    <div className="cart-items">
      <div className="items-title grid grid-cols-6 text-[grey]">
        <p>Item</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>remove</p>
      </div>
      <br />
      <hr />

      {food_list.map((item, index) => {
        if (cartItems[item.id] > 0) {
          return (
            <div className="items-title items-item grid grid-cols-6 items-center">
              <img
                src={"https://mern-restaurant-foodordering.onrender.com" + item.image}
                alt=""
                className="w-32 h-24 mt-4"
              />
              <p>{item.name}</p>
              <p>{item.price} Birr</p>
              <p>{cartItems[item.id]}</p>
              <p>{item.price * cartItems[item.id]} Birr</p>
              <p
                onClick={() => removeCartItem(item.id)}
                className="cursor-pointer"
              >
                X
              </p>
            </div>
          );
        }
      })}

      <div className="cart-bottom mt-[80px] flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-[max(12vw,20px)]">
        <div className="cart-total flex flex-col gap-[20px]">
          <h2 className="font-semibold text-xl">Cart Totals</h2>
          <div>
            <div className="totals-details text-[#555]">
              <p>Sub Total:</p>
              <p>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="totals-details text-[#555]">
              <p>Delivery fee:</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="totals-details text-[#555]">
              <b>Total:</b>
              <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
            <button
              onClick={() => navigate("/order")}
              className="py-1 rounded-sm"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
        <div className="cart-promocode flex-[1]">
          <div>
            <p className="text-[#555]">If you have promocode,enter it here</p>
            <div className="promocode-input flex justify-between item-center mt-[10px] bg-[#eaeaea] rounded-sm">
              <input
                type="text"
                placeholder="promocode"
                className="bg-transparent pl-[10px]"
              />
              <button className="bg-black text-white rounded-sm ">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart
