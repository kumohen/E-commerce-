import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { sellItem } from "../actions/product";
import { clearCart } from "../actions/index";
import { Alert } from "react-bootstrap";

const Payment = ({
  items,
  name,
  price,
  buy,
  marginTop,
  width,
  postId,
  sellItem,
  clearCart,
}) => {
  const [product, setProduct] = useState({});
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const styleBtn = {
    backgroundColor: "rgb(251, 100, 27)",
    padding: "10px",
    color: "white",
    width: width,
    float: "right",
    marginTop: `${marginTop}`,
  };
  useEffect(() => {
    setId(postId);
    setProduct({
      name: "react practise",
      price: buy ? price : items.total,
    });
  }, [items, show]);

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };

    const headers = {
      "Content-type": "Application/json",
    };
    fetch("http://localhost:5000/charges", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }).then((response) => {
      console.log(response);
      const { status } = response;
      console.log(status === 200);

      sellItem(id);
      clearCart();
      setShow(true);
    });
    return setTimeout(() => {
      setShow(false);
    }, 5000);
  };
  return (
    <div>
      {show ? <Alert variant="success">You succesfully payment</Alert> : ""}
      <StripeCheckout
        stripeKey="pk_test_zKpriPTZuuvkW0Lmv32D4kIW00Hpmdac2h"
        name="React "
        token={makePayment}
        amount={product.price * 100}
      >
        <button style={styleBtn}>{name}</button>
      </StripeCheckout>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};
export default connect(mapStateToProps, { sellItem, clearCart })(Payment);
