import React, { useEffect } from "react";
import { connect } from "react-redux";
import { removeItem, increaseQuantity, clearCart, fetchItems } from "./actions";
import Payment from "./Product/Payment";

const Cart = (props) => {
  useEffect(() => {
    props.fetchItems();
  }, [props.addedItems, props.items, props]);

  const removeItemFromCart = (id) => {
    props.removeItem(id);
  };
  const addQuantity = (id) => {
    props.increaseQuantity(id);
    props.fetchItems();
  };

  const renderItem = props.addedItems.map((item) => {
    return (
      <tbody key={item._id}>
        <tr>
          <td>{item.title}</td>
          <td>
            <img
              src={item.image}
              style={{ height: "50px", width: "50px" }}
              alt="items"
            />
          </td>
          <td>₹{item.price}</td>
          <td>{item.quantity}</td>
          <td>
            <i
              className="fa fa-arrow-up "
              aria-hidden="true"
              onClick={() => addQuantity(item._id)}
            ></i>
          </td>
          <td>
            <i
              className="fa fa-arrow-down"
              aria-hidden="true"
              onClick={() => removeItemFromCart(item._id)}
            ></i>
          </td>
        </tr>
      </tbody>
    );
  });
  return (
    <div className="cart_page">
      <div className="summery">
        <h4 style={{ textAlign: "center" }}>Summery</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Add Quantity</th>
              <th scope="col">Remove Quantity</th>
            </tr>
          </thead>
          {renderItem}
        </table>
        <hr />
        <h4 className="cart_total">Total ₹{props.items.total}</h4>
        <button
          className="btn btn-outline-danger"
          onClick={() => props.clearCart()}
          style={{ height: "40px", width: "70px" }}
        >
          clear
        </button>
      </div>
      <br />
      <div style={{ display: "inline-block", marginLeft: "92%" }}>
        <Payment name="CheckOut" />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    items: state.items,
    addedItems: state.items.addedItems,
  };
};
export default connect(mapStateToProps, {
  removeItem,
  increaseQuantity,
  clearCart,
  fetchItems,
})(Cart);
