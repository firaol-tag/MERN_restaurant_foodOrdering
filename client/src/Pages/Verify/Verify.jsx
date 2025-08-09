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
  const tx_ref = searchParams.get("amp;tx_ref");
  const paymentVerification = async() => {
    await axios
      .put(`${url}/api/order/verifypayment`,{success,orderId,tx_ref })
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
