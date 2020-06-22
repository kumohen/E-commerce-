import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { clearCart } from "../actions";
import { logout } from "../actions/auth";

const Navigations = ({ clearCart, logout, auth, items, authState }) => {
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
  const renderList = () => {
    if (isAuth === false) {
      return (
        <>
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/login">
            Signin
          </Link>
          <Link className="nav-link" to="/register">
            Signup
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link className="nav-link" to="/">
            Home
          </Link>
        </>
      );
    }
  };

  return (
    <Navbar
      bg="dark"
      expand="lg"
      fixed="top"
      style={{ color: "white" }}
      variant="dark"
    >
      <Navbar.Brand href="#home">OnlineShop</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {renderList()}
          {isAuth && authState.login.user.isAdmin ? (
            <Link data-rb-event-key="/admin" className="nav-link" to="/admin">
              Admin
            </Link>
          ) : (
            ""
          )}
          {isAuth ? (
            <NavDropdown title="User" id="basic-nav-dropdown">
              <Link className="nav-link" to="/profile">
                <span style={{ marginLeft: "10px", color: "black" }}>
                  {" "}
                  Profile{" "}
                </span>
              </Link>
              <Button
                variant="outline-success"
                onClick={userLogout}
                style={{ marginLeft: "10px" }}
              >
                Logout
              </Button>
            </NavDropdown>
          ) : (
            ""
          )}
        </Nav>
        {isAuth ? (
          <>
            <Link to="/cart" className=" mr-sm-2 nav-link">
              {" "}
              {length}{" "}
              <i
                className="fa fa-shopping-cart "
                aria-hidden="true"
                style={{ margin: "2px", color: "white" }}
              ></i>{" "}
              Cart
            </Link>
          </>
        ) : (
          ""
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth.isLoginin,
    items: state.items.addedItems,
    authState: state.auth,
  };
};
export default connect(mapStateToProps, { logout, clearCart })(Navigations);
