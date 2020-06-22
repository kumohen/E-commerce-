import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Image1 from "../../api/Capture.PNG";
const Profile = ({ auth }) => {
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (auth.isLoginin) {
      fetch("http://localhost:5000/profile", {
        mathod: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          console.log(result);
        });
    }
  }, [data, auth]);
  const userId = auth.isLoginin ? auth.login.user._id : null;
  useEffect(() => {
    if (image) {
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
          fetch("http://localhost:5000/Pro_Image", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image: data.url,
              userId: userId,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              setData(result);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);
  const updatePhoto = (file) => {
    setImage(file);
  };
  const renderProfile = () => {
    return (
      data &&
      data.map((item) => (
        <div key={item._id}>
          <div className="bottom_pro">
            <p>{item.name + " " + item.lastname}</p>
            <p> {item.city ? "City:" + item.city : ""} </p>
            <p> {item.address ? "Address:" + item.address : ""} </p>
            <p> {item.stateName ? "StateName:" + item.stateName : ""} </p>
          </div>
        </div>
      ))
    );
  };

  return (
    <div className="profile">
      <p style={{ textAlign: "center", fontWeight: "600" }}>Profile</p>
      <div style={{ display: "flex" }}>
        <div className="profile_right">
          {data &&
            data.map((item) => (
              <div className="top_profile">
                {item.image ? (
                  <img src={item.image} alt="mahen" className="profile_img" />
                ) : (
                  <img
                    src={Image1}
                    alt="mahen"
                    style={{
                      height: "120px",
                      width: "120px",
                      borderRadius: "50%",
                      marginLeft: "30%",
                    }}
                  />
                )}
              </div>
            ))}
          <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
              <input
                type="file"
                onChange={(e) => updatePhoto(e.target.files[0])}
                className="file-input"
              />
            </div>
          </div>
        </div>
        <div className="profile_card">{renderProfile()}</div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, {})(Profile);
