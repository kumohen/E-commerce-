import React, { Component } from "react";
import { connect } from "react-redux";
import { userLogin } from "../actions/auth";
import { Form, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
//import history from "../../component/history";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submitForm = (e) => {
    e.preventDefault();
    const { password, email } = this.state;
    this.props.userLogin(email, password);
  };
  render() {
    return (
      <div className="login">
        <Form onSubmit={this.submitForm} className="login_form">
          <h2 className="signin_text">SignIn</h2>
          <Form.Group as={Col} controlId="formGridPasswsdord">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email1"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleInput}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassssamword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleInput}
              style={{ marginLeft: "0px", width: "99%" }}
            />
          </Form.Group>

          <Button variant="primary" type="submit" block>
            Login
          </Button>
          <p className="login_footer">
            If You don't have account ,Please{" "}
            <Link to="/register">
              <b style={{ color: "black" }}> Signup </b>
            </Link>
            first
          </p>
        </Form>
      </div>
    );
  }
}

export default connect(null, { userLogin })(Login);
