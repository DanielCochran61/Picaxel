import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../context/UserContext";
import Auth from "../utils/Auth";
import Axios from "axios";

class LoginForm extends Component {
  static contextType = UserContext;

  state = {
    reguser: "",
    regpw: "",
    username: "",
    password: ""
  };

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  registrationHandler = event => {
    event.preventDefault();
    Axios.post("/api/signup", {
      username: this.state.reguser,
      password: this.state.regpw
    })
      .then(data => {
        console.log(data);
      })
      .catch(function(err) {
        alert("Invalid username or password (Username might be taken)");
      });
  };

  submitHandler = e => {
    e.preventDefault();
    const { username, password } = this.state;
    if (username && password) {
      Auth.logIn(username, password, response => {
        this.context.setUser(response);
        this.props.history.push("/");
      });
    }
  };

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.registrationHandler}>
            <h3>Register</h3>
            <input
              type="text"
              name="reguser"
              value={this.state.reguser}
              onChange={this.changeHandler}
            />
            <input
              type="password"
              name="regpw"
              value={this.state.regpw}
              onChange={this.changeHandler}
            />

            <button type="submit">Register</button>
          </form>
        </div>
        <div>
          <form onSubmit={this.submitHandler}>
            <h3>Log In</h3>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.changeHandler}
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.changeHandler}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
