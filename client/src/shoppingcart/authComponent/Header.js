import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { clearCart } from "../actions";
import { logout } from "../actions/auth";

const Header = ({ clearCart, logout, auth, items, authState }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [length, setLength] = useState(0);
  useEffect(() => {
    setIsAuth(auth);
    setLength(items.length);
  }, [auth, items, length]);

  const userLogout = () => {
    clearCart();
    logout();
  };
  console.log(authState);
  const renderList = () => {
    if (isAuth === false) {
      return [
        <li key="12">
          <Link to="/">Home</Link>
        </li>,
        <li key="1">
          <Link to="/login">singin</Link>
        </li>,
        <li key="2">
          <Link to="/register">singup</Link>
        </li>,
      ];
    } else {
      return [
        <li key="142" className="header_home">
          <Link to="/">Home</Link>
        </li>,

        <li key="23">
          {" "}
          <Link to="/cart" className="mr-sm-2 cart_header">
            <span
              style={{
                backgroundColor: "red",
                borderRadius: "50%",
                color: "white",
              }}
            >
              {length}
            </span>
            <i
              className="fa fa-shopping-cart "
              aria-hidden="true"
              style={{ margin: "2px" }}
            ></i>
          </Link>
        </li>,
        <button key="204" className="logout_button" onClick={userLogout}>
          logout
        </button>,
      ];
    }
  };
  console.log("auth", auth);
  return (
    <div className="header">
      <ul className="ul_header_ele">
        {renderList()}
        {isAuth && authState.login.user.isAdmin ? (
          <li key="35">
            <Link to="/admin">admin</Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth.isLoginin,
    items: state.items.addedItems,
    authState: state.auth,
  };
};
export default connect(mapStateToProps, { logout, clearCart })(Header);
