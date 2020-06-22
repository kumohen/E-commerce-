import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { userLogin } from "./actions/index";
const CreateCart = (props) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  // for mobile and laptop
  const [displaySize, setDisplaySize] = useState("");
  const [color, setColor] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStroage] = useState("");
  const [battery, setBattery] = useState("");
  //
  const [category, setCategory] = useState("man");

  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      props.userLogin(
        title,
        price,
        desc,
        size,
        url.url,
        category,
        displaySize,
        color,
        ram,
        storage,
        battery
      );
    }
  }, [
    url,
    title,
    price,
    desc,
    size,
    displaySize,
    color,
    ram,
    storage,
    battery,
    props,
  ]);
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const handleSize = (event) => {
    setSize(event.target.value);
  };
  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "voting");
    data.append("cloud_name", "dvfpkko1z");
    fetch("https://api.cloudinary.com/v1_1/dvfpkko1z/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.url);
        setUrl({ url: data.url });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="create_item_form">
      <div className="form-group mt-2">
        <input
          className="form-control"
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          placeholder="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <div className="form-group">
        <input
          className="form-control"
          type="number"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      {category === "mobile" || category === "laptop" ? (
        <>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="color "
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="number"
              placeholder="display size"
              value={displaySize}
              onChange={(e) => setDisplaySize(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="number"
              placeholder="RAM SIZE"
              value={ram}
              onChange={(e) => setRam(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="number"
              placeholder="battery power"
              value={battery}
              onChange={(e) => setBattery(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="number"
              placeholder="storage"
              value={storage}
              onChange={(e) => setStroage(e.target.value)}
            />
          </div>
        </>
      ) : (
        ""
      )}
      {category === "man" || category === "women" ? (
        <div>
          <select value={size} onChange={handleSize}>
            <option value="sm">S</option>
            <option value="md">M</option>
            <option value="lg">L</option>
            <option value="xl">XL</option>
          </select>
        </div>
      ) : (
        ""
      )}
      <div>
        <select value={category} onChange={handleChange}>
          <option value="man">Man</option>
          <option value="women">Women</option>
          <option value="mobile">Mobile</option>
          <option value="laptop">Laptop</option>
        </select>
      </div>

      <div>
        <label>Example file input</label>
        <input
          type="file"
          className="form-control-file "
          onChange={(e) => setImage(e.target.files[0])}
          id="exampleFormControlFile1"
        />
      </div>
      <button
        className="btn waves-effect waves-light #64b5f6 blue darken-1 mt-2 mb-2"
        onClick={() => postDetails()}
      >
        Create Product
      </button>
    </div>
  );
};

export default connect(null, { userLogin })(CreateCart);
