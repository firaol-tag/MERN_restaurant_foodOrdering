import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./LoginPopup.css";
import { StoreContext } from "../../Context/StoreContext";
const LoginPopup = ({ setShowLoginPopup }) => {
  const [currState, setCurrState] = useState("Login");
  const { setToken, url } = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  // let url = "http://localhost:4000";
  console.log();
  const onLogin = (e) => {
    e.preventDefault();
    let Url = url;
    if (currState === "Login") {
      Url += "/api/user/login";
    } else {
      Url += "/api/user/register";
    }
    axios
      .post(Url, data)
      .then((res) => {
        setToken(res.data.token);
        // console.log(token)
        localStorage.setItem("token", res.data.token);
        setShowLoginPopup(false);
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };
  return (
    <div className="login-popup bg-[#00000090] absolute w-full h-full grid ">
      <form
        onSubmit={onLogin}
        className="popup-container flex flex-col text-[#808080] bg-white text-xl rounded-md"
      >
        <div className="container-title flex justify-between items-center ">
          <h2>{currState}</h2>
          <button
            className="cursor-pointer"
            onClick={() => setShowLoginPopup(false)}
          >
            close
          </button>
        </div>
        <div className="popup-inputs flex flex-col ">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="your name"
              name="name"
              onChange={handleChange}
              value={data.name}
              required
            />
          )}
          <input
            type="email"
            placeholder="your email"
            name="email"
            onChange={handleChange}
            value={data.email}
          />
          <input
            type="password"
            placeholder="your password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
          />
        </div>
        <button type="submit" className="bgt text-white w-full p-1 text-center">
          {currState === "Sign up" ? "Create account" : "Login"}
        </button>
        <div className="popup-conditions flex items-start gap-[8px] mt-[15px]]">
          <input type="checkbox" required className="mt-[7px]" />
          <p>By continuing, I agree to the term of use and privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?
            <span
              className="tmt font-semibold"
              onClick={() => setCurrState("Sign up")}
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span
              className="tmt font-semibold"
              onClick={() => setCurrState("Login")}
            >
              login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
