import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart, filterItem, filterItemBySize, fetchItems } from "./actions";
import { Link } from "react-router-dom";
import Carousel from "./Product/Carousel";
import Category from "./Product/Reuse/Category";

import Review from "./Product/Reuse/Review";

class ItemList extends Component {
  state = {
    filter: false,
  };
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.props.fetchItems();
    } else {
      this.props.history.push("/login");
    }
  }
  handleClick = (id) => {
    this.props.addToCart(id);
  };

  setGender = (e) => {
    this.props.filterItem(e.target.value);
    this.setState({
      filter: true,
    });
  };
  handleInputChange = (e) => {
    this.props.filterItemBySize(e.target.value);
    this.setState({
      filter: true,
    });
  };

  itemList = () => {
    return this.props.items.items.map((item) => {
      return (
        <div className="card" key={item._id}>
          <Link to={`/cart/${item._id}`}>
            <p className="card-title">{item.title}</p>

            <div className="card-text">
              {item.category === "mobile" ? (
                <div style={{ backgroundColor: "white", width: "100%" }}>
                  <img
                    src={item.image}
                    alt={item._id}
                    className="mobile_image"
                  />
                </div>
              ) : (
                <img
                  src={item.image}
                  alt={item._id}
                  style={{ height: "200px", width: "100%" }}
                />
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Review reviews={item.reviews} show />
                <b className="card-price">₹ {item.price}</b>
              </div>
            </div>
          </Link>
          {this.props.auth.isLoginin ? (
            <span
              to="/"
              className="btn btn-danger"
              onClick={() => {
                this.handleClick(item._id);
              }}
            >
              <i className="material-icons">AddToCard</i>
            </span>
          ) : (
            ""
          )}
        </div>
      );
    });
  };
  filterList = () => {
    if (this.state.filter) {
      return this.props.items.filteredItem.map((item) => {
        return (
          <div className="card" key={item._id}>
            <Link to={`/cart/${item._id}`}>
              <p className="card-title">{item.title}</p>
              <div className="card-text">
                {item.category === "mobile" ? (
                  <img
                    src={item.image}
                    alt={item._id}
                    className="mobile_image"
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item._id}
                    style={{ height: "200px", width: "100%" }}
                  />
                )}

                <p>
                  <b className="card-price">Price: {item.price}$</b>
                </p>
              </div>
            </Link>
            <span
              to="/"
              className="btn btn-danger"
              onClick={() => {
                this.handleClick(item._id);
              }}
            >
              <i className="material-icons">addtoCard</i>
            </span>
          </div>
        );
      });
    }
  };
  render() {
    return (
      <>
        <div>
          <div className="carousel_item">
            <Carousel />
          </div>
          <div className="row" style={{ marginBottom: "40px" }}>
            <div
              className="col-sm-1 "
              style={{
                backgroundColor: "white",
                height: "80vh",
                marginLeft: "15px",
                paddingTop: "1%",
              }}
            >
              <div className="filter">
                <div>
                  <p> By Price:</p>
                  <div onChange={this.setGender} className="mb-2">
                    <input type="radio" value="500" name="gender" /> 500
                  </div>
                  <div onChange={this.setGender} className="mb-2">
                    <input type="radio" value="1000" name="gender" /> 1000
                  </div>
                  <div onChange={this.setGender} className="mb-2">
                    <input type="radio" value="5000" name="gender" /> 5000
                  </div>
                  <div onChange={this.setGender} className="mb-2">
                    <input type="radio" value="10000" name="gender" /> 10000
                  </div>
                  <div onChange={this.setGender} className="mb-2">
                    <input type="radio" value="50000" name="gender" /> 50000
                  </div>
                </div>
                <hr />
                <div>
                  <p>By Size</p>

                  <div onChange={this.handleInputChange} className="mb-2">
                    <input name="size" type="radio" value="lg" />
                    large
                  </div>
                  <div onChange={this.handleInputChange} className="mb-2">
                    <input name="size" type="radio" value="md" />
                    mid
                  </div>
                  <div onChange={this.handleInputChange} className="mb-2">
                    <input name="size" type="radio" value="sm" />
                    small
                  </div>
                </div>
                <div onChange={this.setGender} className="mb-2">
                  <input type="radio" value="" name="gender" /> All
                </div>
              </div>
            </div>
            <div
              className="col-sm-10"
              style={{
                height: "600px",
                overflow: "scroll",
                marginLeft: "60px",
              }}
            >
              {this.state.filter ? this.filterList() : this.itemList()}
            </div>
          </div>

          <Category title="Man" category="man" />
          <Category title="Women" category="women" />
          <Category title="Laptop" category="laptop" />

          <Category title="Mobile" category="mobile" />
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    items: state.items,
    auth: state.auth,
  };
};
export default connect(mapStateToProps, {
  addToCart,
  filterItem,
  filterItemBySize,
  fetchItems,
})(ItemList);
