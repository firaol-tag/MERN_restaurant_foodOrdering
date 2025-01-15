import React, { useState } from "react";
import "./Add.css";
import fileupload from "./../../Assets/upload_icon.png";
import axios from "axios";
import { toast } from "react-toastify";
const Add = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
    price: null,
  });
  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("image", image);
    formData.append("price", data.price);
    axios
      .post("http://localhost:4000/api/food/add", formData)
      .then((res) => {
        console.log(res.data);
        setData({ name: "", description: "", category: "", price: null });
        setImage(false);
        toast.success(res.data.message);
      })
      .catch((err) => toast.error(err.response.data.message));
  };
  return (
    <div className="add w-[70%] mt-[50px] ml-[max(5vw,25px)] text-[#6d6d6d] font-xl">
      <form
        onSubmit={handleSubmit}
        className="add-content flex flex-col gap-4 "
      >
        <div className="file-upload flex flex-col gap-4">
          <p>Upload image</p>
          <label for="image">
            <img
              src={image ? URL.createObjectURL(image) : fileupload}
              alt=""
              className="w-12 h-12 cursor-pointer"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            className="hidden"
            required
          />
        </div>
        <div className="product-name flex flex-col gap-4 w-[max(40%,280px)]">
          <p>name</p>
          <input
            onChange={onchangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="enter here"
            required
          />
        </div>
        <div className="product-description flex flex-col gap-4 w-[max(40%,280px)]">
          <p>description</p>
          <textarea
            onChange={onchangeHandler}
            value={data.description}
            name="description"
            id="description"
            row="6"
            required
          >
            write here
          </textarea>
        </div>
        <div className="flex gap-[30px]">
          <div className="product-category flex flex-col gap-4">
            <p>category</p>
            <select
              onChange={onchangeHandler}
              name="category"
              id="category"
              className="p-4 w-[120px]"
              required
            >
              <option value="Vegetarian Combo">Vegetarian Combo</option>
              <option value="Meat Combo">Meat Combo</option>
              <option value="Signature Dishes">Signature Dishes</option>
              <option value="Side Dishes">Side Dishes</option>
              <option value="Desserts">Desserts</option>
              <option value="Injera Varieties">Injera Varieties</option>
            </select>
          </div>
          <div className="product-price flex flex-col gap-4">
            <p>price</p>
            <input
              name="price"
              onChange={onchangeHandler}
              value={data.price}
              type="number"
              placeholder="enter price"
              className="p-4 w-[120px]"
              required
            />
          </div>
        </div>
        <button type="submit" className="w-[120px] text-white bg-black p-4">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
