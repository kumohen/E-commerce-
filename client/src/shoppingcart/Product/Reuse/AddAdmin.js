import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { userRegister } from "../../actions/auth";

class AddAdmin extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    isAdmin: false,
  };
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleState = (e) => {
    this.setState({ isAdmin: e.target.checked });
  };
  submitForm = (e) => {
    e.preventDefault();
    const { firstname, lastname, password, email, isAdmin } = this.state;

    this.props.userRegister(firstname, lastname, password, email, isAdmin);
  };
  render() {
    return (
      <div className="registation">
        <Form onSubmit={this.submitForm} className="registation_form">
          <h2 className="signin_text">Add Admin</h2>
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
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
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
            />
          </Form.Group>

          <Form.Group as={Col} controlId="admisn">
            <Form.Check
              type="checkbox"
              name="admin"
              value={this.state.isAdmin}
              onChange={this.handleState}
            />{" "}
            Admin
          </Form.Group>

          <Button variant="primary" type="submit" id="register_button">
            Add Admin
          </Button>
        </Form>
      </div>
    );
  }
}

export default connect(null, { userRegister })(AddAdmin);
