const db = require("../../config/db");
module.exports = {
  placeOrder: ({ userId, items, amount, address }, callback) => {
    const value = [
      userId,
      JSON.stringify(items),
      amount,
      JSON.stringify(address),
    ];

    const sql =
      "INSERT INTO orders(user_id, items, amount, address) VALUES (?,?,?,?)";
    db.query(sql, value, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  },
  deletecart: (userId, callback) => {
    const sql = "DELETE FROM cart WHERE user_id=?";
    db.query(sql, [userId], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  },
  verifyorders: ({ payment, orderId }, callback) => {
    const sql = "UPDATE orders SET payment=? WHERE id=?";
    db.query(sql, [payment, orderId], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  },
  getorders: ({ userId, payment }, callback) => {
    const sql = "SELECT * FROM orders WHERE user_id=? AND payment=?";
    db.query(sql, [userId, payment], (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  },
  allOrder: (payment, callback) => {
    const sql = "SELECT * FROM orders WHERE payment=?";
    db.query(sql, [payment], (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  },
};
