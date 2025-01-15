import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import {assets} from "./../../Assets/Assets"
import { useNavigate } from "react-router-dom";
const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
   const navigate = useNavigate();
  // console.log(token);
  const GetOrders = () => {
    axios
      .post(`${url}/api/order/getorders`, {}, { headers: { token } })
      .then((res) => {
        const orders = res.data.data.map((order) => ({
          ...order,
          items: JSON.parse(order.items),
          address:JSON.parse(order.address)
        }));
        setData(orders);
      })
      .catch((err) => {
        console.log(err.response.data);
      }); 
  };
  console.log(data)
  useEffect(() => {
    if (token) {
      GetOrders();
    }
  }, [token]);
  return (
    <div className="orders">
      <div className="flex justify-center mt-8">
        <p className="font-bold text-2xl text-[#454545]">My Orders</p>
      </div>

      <div className="container mt-10 flex flex-col gap-[30px]">
        {data.map((order, index) => (
          <div key={index} className="order p-1 bg-stone-100 text-[#454545]">
            <img src={assets.box} className="w-14 h-14" />
            <div>
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return item.name + " x " + item.quantity;
                } else {
                  return item.name + " x " + item.quantity + " ,";
                }
              })}
            </div>
            <p>Items: {order.items.length}</p>
            <p>{order.amount + " "}Birr</p>
            <span>
              status: <b className="text-[#454545]">{order.status}</b>
            </span>
            <button
            onClick={()=>GetOrders()}
              className="p-1 rounded-xl bg-red-300 cursor-pointer text-[#454545] outline-[tomato]"
              type="submit"
            >
              Track order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
