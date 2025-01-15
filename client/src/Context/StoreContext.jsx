import { createContext, useEffect, useState } from "react";
// import { food_list } from "../Assets/Assets";
import axios from "axios";
export const StoreContext = createContext(null);
export const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodlist] = useState([]);
  const url = "https://mern-restaurant-foodordering.onrender.com";
  console.log(token);
  console.log(cartItems)
  const itemI=0;
  console.log(itemI)
  const addCartItems = (itemId) => {
    // cartItems.forEach((item) => {
    //   if ("cart_mount" in item) {
    //     itemI += item.cart_mount;
    //   }
    // });
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      axios
        .put(
          "https://mern-restaurant-foodordering.onrender.com/api/cart/addtocart",
          { itemId },
          { headers: { token } }
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  };
  const removeCartItem = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      axios
        .put(
          "https://mern-restaurant-foodordering.onrender.com/api/cart/removefromcart",
          { itemId },
          { headers: { token } }
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  };
  const getTotalCartAmount = () => {
    let totalCartAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemId = parseInt(item);
        if (food_list.length > 0) {
          // console.log(food_list.find((product) => product.id === itemId));
          let itemInfo = food_list.find((product) => product.id === itemId);
          if (itemInfo) {
            totalCartAmount += itemInfo.price * cartItems[item];
          }
        }
      }
    }
    return totalCartAmount;
  };
  const fetchFood = () => {
    axios
      .get("https://mern-restaurant-foodordering.onrender.com/api/food/list")
      .then((res) => {
        console.log(res.data);
        setFoodlist(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCart=(token)=>{
    axios.post(
      "https://mern-restaurant-foodordering.onrender.com/api/cart/getcart",{},
      { headers: { token } }
    )
    .then((res)=>{
      console.log(res.data.data)
      setCartItems(res.data.data)
      
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  useEffect(() => {
    const loadData = () => {
      fetchFood();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        getCart(localStorage.getItem("token"));
      }
    };
    loadData();
  }, []);
  // useEffect(()=>{
  //   console .log(cartItems)
  // },[cartItems])
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addCartItems,
    removeCartItem,
    getTotalCartAmount,
    token,
    setToken,
    url,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
