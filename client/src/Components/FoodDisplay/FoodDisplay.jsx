import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import axios from "axios"
import "./foodDisplay.css";
const FoodDisplay = ({ category }) => {
  const { food_list} = useContext(StoreContext);
  // useEffect(()=>{
    
  // },[])
  return (
    <div className="food_display" id="food_display">
      <h1>Top Dishes near you</h1>
      <div className="food_display_list">
        {
          food_list.map((item,index)=>{
            console.log(category,item.category)
            if(category==="all" || category === item.category){
              return <FoodItem key={index} id={item.id} name={item.name} price={item.price} image={item.image} description={item.description} />
            }
           }
          )
        }
      </div>
    </div>
  );
};

export default FoodDisplay;
