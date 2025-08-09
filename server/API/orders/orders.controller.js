const db = require("../../config/db");
const { Chapa } = require("chapa-nodejs");
const axios = require("axios");
const {
  placeOrder,
  deletecart,
  verifyorders,
  getorders,
  allOrder,
} = require("./orders.service");
const requests = require("request");
module.exports = {
  PlaceOrder: async (req, res) => {
    const userId = req.id;
    const { address, items, amount } = req.body.orderData;
    console.log(process.env.CHAPAKEY);
    placeOrder({ userId, items, amount, address }, (err, result) => {
      if (err) return res.status(560).json({ success: false, msg: err });
      deletecart(userId, (err, result) => {
        if (err) return res.status(550).json({ success: false, msg: err });
        const sql = "SELECT id FROM orders WHERE user_id=? AND items=?";

        let line_items = items.map((item) => ({
          price_data: {
            product_name: item.name,
            amount: item.price,
          },
          quantity: item.quantity,
        }));
        line_items.push({
          price_data: {
            product_name: "delivery discharge",
            amount: 2,
          },
          quantity: 1,
        });
        db.query(sql, [userId, JSON.stringify(items)], async (err, result) => {
          if (err) {
            console.log(err);
            return res.status(600).json({ success: false, msg: err });
          }
          const chapa = new Chapa({
            secretKey: process.env.CHAPAKEY,
          });
          const tx_ref = await chapa.genTxRef({
            removePrefix: true, // defaults to `false`
            size: 20, // defaults to `15`
          });
          let orderId = result[0].id;

          var options = {
            method: "POST",
            url: "https://api.chapa.co/v1/transaction/initialize",
            headers: {
              Authorization: `Bearer ${process.env.CHAPAKEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              line_items: line_items,
              first_name: address.firstName,
              last_name: address.lastName,
              email: address.email,
              street: address.street,
              city: address.city,
              phone_number: address.phone,
              currency: "ETB",
              amount: amount,
              tx_ref: tx_ref,
              callback_url: `http://localhost:3000/callback`,
              return_url: `http://localhost:3000/verify?success=true&orderID=${orderId}&tx_ref=${tx_ref}`,
            }),
          };
          requests(options, function (error, response) {
            if (error)
              return res.status(601).json({ success: false, msg: error });
            const responsebody = JSON.parse(response.body);
            return res.json(responsebody);
          });
        });
      });
    });
  },
  verifyPayment: (req, res) => {
    const { success, orderId, tx_ref } = req.body;
    const payment = true;
    console.log(req.body);
    const chapaKey = process.env.CHAPAKEY; // Load from .env file
    axios
      .get(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, {
        headers: { Authorization: `Bearer ${chapaKey}` },
      })
      .then((response) => {
        console.log(response.data.data.status);
        if (response.data.data.status == "success") {
          verifyorders({ payment, orderId }, (err, result) => {
            if (err) {
              return res.status(346).json({ message: "error happens" });
            }
            return res.json({ success: true, message: "Paid" });
          });
        } else {
          const sql = "DELETE FROM orders WHERE id=?";
          db.query(sql, [orderId], (err, result) => {
            if (err) {
              return res.status(432).json({ message: "error happens" });
            }
            return res.json({ success: false, message: "not paid" });
          });
        }
      })
      .catch((error) => {
        console.error(
          "Error verifying payment:",
          error.response ? error.response.data : error.message
        );
      });
  },
  getOrders: (req, res) => {
    const userId = req.id;
    // console.log(userId
    const payment = 1;
    getorders({ userId, payment }, (err, result) => {
      if (err) {
        return res.status(699).json({ message: "successfuly fetched" });
      }
      return res.json({ data: result });
    });
  },
  getAllOrder: async (req, res) => {
    const payment = 1;
    allOrder(payment, (err, result) => {
      if (err) {
        return res.status(850).json({ success: false, message: err });
      }
      return res.json({ success: true, data: result });
    });
  },
  changeStatus: (req, res) => {
    const { status, id } = req.body;
    console.log(status, id);
    const sql = "UPDATE orders SET status=? WHERE id=?";
    db.query(sql, [status, id], (err, result) => {
      if (err) {
        return res.status(850).json({ success: false, message: err });
      }
      return res.json({ success: true, data: result });
    });
  },
};
