import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "./Responsive";

const ItemList = ({ items }) => {
  const renderList = (items) => {
    return items.map((item) => (
      <div key={item._id} className="itemlist">
        <Link to={`/cart/${item._id}`}>
          {item.category === "mobile" ? (
            <img
              src={item.image}
              id="cover"
              className="mobile_image"
              alt="mohen"
            />
          ) : (
            <img src={item.image} className="itemlist_img" alt="mohen" />
          )}
          <p className="itemlist_title">{item.title}</p>
          <p className="itemlist_price">${item.price}</p>
        </Link>
      </div>
    ));
  };

  return (
    <div>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={3000}
      >
        {renderList(items)}
      </Carousel>
    </div>
  );
};

export default ItemList;
