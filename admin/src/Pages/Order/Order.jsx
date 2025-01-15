import React from 'react'
import './Order.css'
import axios from "axios"
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import {assets} from "./../../Assets/Assets"
const Order = () => {
  const [data,setData]=useState([])
  const allOrders=()=>{
  axios.get("http://localhost:4000/api/order/allorders")
  .then((res)=>{
    console.log(res.data.data)
    const orders = res.data.data.map((order) => ({
      ...order,
      items: JSON.parse(order.items),
      address: JSON.parse(order.address),
    }));
    setData(orders)
  })
  .catch((err)=>{
    console.log(err.response.data)
  })
  }
  const handChange=(e,id)=>{
axios.put("http://localhost:4000/api/order/status",{status:e.target.value,id})
.then((res)=>{
  console.log(res.data)
  allOrders()
})
.catch((err)=>{
  console.log(err.response.data)
})
  }
  useEffect(()=>{
allOrders()
  },[])
  return (
    <div className="orders w-[80%]">
      <div className="flex justify-center mt-8">
        <p className="font-bold text-2xl text-[#454545]">Orders</p>
      </div>

      <div className="container mt-10 flex flex-col gap-[30px]">
        {data.map((order, index) => (
          <div key={index} className="order p-1 bg-stone-100 text-[#454545]">
            <img src={assets.Box} className="w-14 h-14" />
            <div>
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return item.name + " x " + item.quantity;
                } else {
                  return item.name + " x " + item.quantity + " ,";
                }
              })}
               <div>
                <p className='location'></p>
                <p className='Customer'></p>
               </div>
            </div>
            <p>Items: {order.items.length}</p>
            <p>{order.amount + " "}Birr</p>
            <select onChange={(e)=>handChange(e,order.id)} className="p-1 rounded-xl bg-red-300 cursor-pointer text-[#454545] outline-[tomato]" value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delevery">Out For Delevery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order
