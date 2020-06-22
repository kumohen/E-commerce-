import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "./component/history";
import Header from "./component/Header";
import CreatePost from "./component/Post/CreatePost";
import EditPost from "./component/Post/EditPost";
import ShowPost from "./component/Post/ShowPost";
import PostList from "./component/Post/PostList";
import DeletePost from "./component/Post/DeletePost";
import PostModal from "./component/postModalCreate";
import Footer from "./shoppingcart/authComponent/Footer";
class App extends Component {
  render() {
    return (
      <div className="ui container">
        <Router history={createHistory}>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={PostList} />
              <Route exact path="/post/new" component={CreatePost} />
              <Route exact path="/post/delete/:id" component={DeletePost} />
              <Route exact path="/post/edit/:id" component={EditPost} />
              <Route exact path="/post/:id" component={ShowPost} />
              <Route exact path="/createPost" component={PostModal} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
