import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import UserContext from "./context/UserContext";
import { Menu } from "semantic-ui-react";
import Auth from "./utils/Auth";

import "./App.css";

class App extends Component {

	state = {
		user: null,
		redirect: false
	}

	componentDidMount() {
		if (Auth.isLoggedIn()) {
			this.setState({
				user: { username: Auth.getUsername() }
			})
		}
	}

	setUser = (user) => {
		this.setState({ user });
	}

	logout = () => {
		Auth.logOut(() => {
			return this.forceUpdate();
		})
	}

	render() {
		const { user } = this.state;
		const setUser = this.setUser;

		return (
			<Router>
				<div>
					<header className="topBar">
						<Menu>
							<Menu.Item as='a' onClick={this.logout}>Logout</Menu.Item>
						</Menu>
					</header>
					<UserContext.Provider value={{ setUser, user }}>
						<Switch>
							<Route exact path="/" component={LoginPage} />
							<ProtectedRoute exact path="/home" component={HomePage} />
						</Switch>
					</UserContext.Provider>
				</div>
			</Router>
		);
	}
}

export default App;
