import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Navigation from "./authComponent/Navbar";
import createHistory from "../component/history";
import ItemList from "./ItemList";
import Cart from "./Cart";
import Login from "./authComponent/Login";
import Register from "./authComponent/Register";
import CartDetail from "./CartDetail";
import CreateCart from "./CreateCart";
import AllProduct from "./Product/Products";
import Admin from "./Admin";
import Profile from "./authComponent/Profile";
import Footer from "./authComponent/Footer";

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <Router history={createHistory}>
          <div>
            <Navigation />
            <Switch>
              <Route exact path="/" component={ItemList} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/cart/:id" component={CartDetail} />
              <Route path="/admin" component={Admin} />
              <Route path="/profile" component={Profile} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/create" component={CreateCart} />
              <Route exact path="/productList" component={AllProduct} />
              <Route exact path="/register" component={Register} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
