import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { userRegister } from "../actions/auth";
import { sName } from "../utils/utils";
import { Link } from "react-router-dom";

class Register extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    zip: "",
    address: "",
    address2: "",
    city: "",
    stateName: "",
    isAdmin: false,
  };
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleState = (e) => {
    this.setState({ stateName: e.target.value });
  };
  submitForm = (e) => {
    e.preventDefault();
    const {
      firstname,
      lastname,
      password,
      email,
      isAdmin,
      zip,
      address,
      address2,
      city,
      stateName,
    } = this.state;

    this.props.userRegister(
      firstname,
      lastname,
      password,
      email,
      isAdmin,
      zip,
      address,
      address2,
      city,
      stateName
    );
  };
  render() {
    return (
      <div className="registation">
        <Form onSubmit={this.submitForm} className="registation_form">
          <h2 className="signin_text">SignUp</h2>
          <Form.Row>
            <Form.Group as={Col} controlId="FirstName">
              <Form.Label>FirstName</Form.Label>
              <Form.Control
                type="text"
                placeholder="FirstName"
                name="firstname"
                value={this.state.firstname}
                onChange={this.handleInput}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="LastName">
              <Form.Label>LastName</Form.Label>
              <Form.Control
                type="text"
                placeholder="LastName"
                name="lastname"
                value={this.state.lastname}
                onChange={this.handleInput}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group as={Col} controlId="formGridPasswsdord">
            <Form.Label id="email_id">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleInput}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassssamword">
            <Form.Label id="email_id">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleInput}
            />
          </Form.Group>

          <Form.Group controlId="formssGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Enter Address"
              value={this.state.address}
              onChange={this.handleInput}
            />
          </Form.Group>
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address2</Form.Label>
            <Form.Control
              type="text"
              name="address2"
              placeholder="Enter Address2"
              value={this.state.address2}
              onChange={this.handleInput}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label id="email_id">City</Form.Label>
            <Form.Control
              name="city"
              placeholder="Enter City"
              value={this.state.city}
              id="city_name"
              onChange={this.handleInput}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control
                as="select"
                value={this.state.stateName}
                onChange={this.handleState}
              >
                {sName.map((item) => (
                  <option value={item} key={item}>
                    {" "}
                    {item}{" "}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
                name="zip"
                placeholder="Enter Zipcode"
                value={this.state.zip}
                onChange={this.handleInput}
              />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit" id="register_button">
            SignUp
          </Button>
          <p className="login_footer">
            If You have account ,Please go to
            <Link to="/login">
              <b style={{ color: "black" }}> Signin </b>
            </Link>
            page
          </p>
        </Form>
      </div>
    );
  }
}

export default connect(null, { userRegister })(Register);
