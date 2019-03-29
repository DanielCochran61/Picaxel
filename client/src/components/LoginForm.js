import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../context/UserContext";
import Auth from "../utils/Auth";
import Axios from "axios";
import { Grid, Form, Input, Button, Image } from "semantic-ui-react";

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
      <Grid>
        <Grid.Row centered>
        <Image src="https://fontmeme.com/permalink/190329/782fbe6b51d892a825fb0c88db50a702.png" alt="pixel-fonts" />
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column width={3}>
            <Form onSubmit={this.registrationHandler}>
              <h3>Register</h3>
              <Form.Field>
                <input
                  type="text"
                  name="reguser"
                  value={this.state.reguser}
                  onChange={this.changeHandler}
                />
              </Form.Field>
              <Form.Field>
                <input
                  type="password"
                  name="regpw"
                  value={this.state.regpw}
                  onChange={this.changeHandler}
                />
              </Form.Field>
              <Form.Field>
                <Button type="submit" color="green">
                  Register
                </Button>
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column width={3}>
            <Form onSubmit={this.submitHandler}>
              <h3>Log In</h3>
              <Form.Field>
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.changeHandler}
                />
              </Form.Field>
              <Form.Field>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.changeHandler}
                />
              </Form.Field>
              <Form.Field>
                <Button type="submit" color="teal">
                  Submit
                </Button>
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default withRouter(LoginForm);
