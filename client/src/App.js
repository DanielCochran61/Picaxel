import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import UserContext from "./context/UserContext";
import { Menu } from "semantic-ui-react";

import "./App.css";

class App extends Component {

	state = {
		user: null
	}

	setUser = (user) => {
		this.setState({ user });
	}

  render() {
	const {user} = this.state;
	const setUser = this.setUser;
    return (
		<Router>
			<div>
				<header>
						<Menu>
							<Menu.Item as='a' to="/logout">Logout</Menu.Item>
						</Menu>
				</header>
				<UserContext.Provider value={{ setUser, user }}>
					<Switch>
						<Route exact path="/" component={LoginPage} />
						<ProtectedRoute exact path="/home" component={HomePage} />
						<Route component={LoginPage} />
					</Switch>
				</UserContext.Provider>
			</div>
		</Router>
    );
  }
}

export default App;
