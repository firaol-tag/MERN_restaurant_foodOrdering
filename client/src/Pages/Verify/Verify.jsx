import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
const Verify = () => {
  const { token, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("amp;orderID");
  const paymentVerification = () => {
    axios
      .put(`${url}/api/order/verifypayment`,{success,orderId })
      .then((res) => {
        if (res.data.success===true) {
          navigate("/myorders");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  useEffect(() => {
    paymentVerification();
  }, []);
  return (
    <div className="verify ">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
