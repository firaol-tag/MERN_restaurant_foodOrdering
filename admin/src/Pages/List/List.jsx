import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
const List = () => {
  const [list, setList] = useState([]);
  
  useEffect(() => {
    axios
      .get("https://restaurant.waratechnology.com/api/food/list")
      .then((res) => {
        console.log(res.data.data);
        setList(res.data.data);
      })
      .catch((err) => {});
  }, []);
  const handleRemove = async(id) => {
    await axios
      .delete("https://restaurant.waratechnology.com/api/food/delete/" + id)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="list pt-8 flex flex-col w-[80%] mt-[5px]">
      <p>All list of food</p>
      <div className="list_table flex flex-col w-full">
        <div className="list_table_format grid grid-cols-5 title">
          <b>image</b>
          <b>name</b>
          <b>category</b>
          <b>price</b>
          <b>action</b>
        </div>
        {list.map((item, index) => (
          <div
            key={index}
            className="bg-stone-100 list_table_format grid grid-cols-5"
          >
            <img
              src={"https://restaurant.waratechnology.com" + item.image}
              className="w-28 h-28"
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p onClick={() => handleRemove(item.id)} className="cursor-pointer">
              x
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
