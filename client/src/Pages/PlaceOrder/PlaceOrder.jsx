import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import "./PlaceOrder.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
   const navigate = useNavigate();
  const { getTotalCartAmount, url, food_list, cartItems, token } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    LastName: "",
    email: "",
    street: "",
    city: "",
    phone: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const orderItems = [];
    food_list.map((item) => {
      if (cartItems[item.id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item.id];
        orderItems.push(itemInfo);
      }
      console.log(orderItems);
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    await axios
      .post(
        `${url}/api/order/placeorder`,
        { orderData },
        { headers: { token } }
      )
      .then((res) => {
      console.log(res.data.data)
        window.location.replace(res.data.data.checkout_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(()=>{
    if(!token){
      navigate("/cart")
    }
    else if(getTotalCartAmount==0){
      navigate("/cart")
    }
  },[token])
  return (
    <form
      onSubmit={handleSubmit}
      className="place-order flex justify-between items-start gap-[50px] mt-[100px]"
    >
      <div className="place-order-left flex flex-col w-full max-w-[max(30%,500px)]">
        <p className="text-2xl font-semibold mb-[50px]">Delivery information</p>
        <div className="flex gap-2">
          <input
            required
            type="text"
            name="firstName"
            onChange={handleChange}
            value={data.firstName}
            placeholder="first name"
          />
          <input
            required
            type="text"
            name="lastName"
            placeholder="last name"
            onChange={handleChange}
            value={data.lastName}
          />
        </div>
        <input
          required
          type="email"
          name="email"
          placeholder="email address"
          onChange={handleChange}
          value={data.email}
        />
        <input
          required
          type="text"
          name="street"
          placeholder="street"
          onChange={handleChange}
          value={data.street}
        />
        <input
          required
          type="text"
          name="city"
          placeholder="city"
          onChange={handleChange}
          value={data.city}
        />
        <input
          required
          type="text"
          name="phone"
          placeholder="phone"
          onChange={handleChange}
          value={data.phone}
        />
      </div>
      <div className="place-order-right w-full max-w-[max(40%,500px)]">
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
          <button className="py-1 mt-8 rounded-sm">Proceed To Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
