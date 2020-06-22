import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchItems } from "../actions";
import { Link } from "react-router-dom";
import { responsive } from "./Reuse/Responsive";
import Carousel from "react-multi-carousel";

const ProductList = ({ items, fetchItems }) => {
  useEffect(() => {
    fetchItems();
  }, [items, fetchItems]);
  const itemList = () => {
    return items.items.map((item) => {
      return (
        <div key={item._id} style={{ height: "300px" }}>
          <Link to={`/cart/${item._id}`}>
            <img
              src={item.image}
              style={{ width: "75%", height: "200px" }}
              alt="mohen"
            />
            <p style={{ color: "black", fontWeight: "600" }}>{item.title}</p>
            <p>${item.price}</p>
          </Link>
        </div>
      );
    });
  };

  return (
    <div>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={3000}
      >
        {itemList()}
      </Carousel>
      ;
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};
export default connect(mapStateToProps, { fetchItems })(ProductList);
