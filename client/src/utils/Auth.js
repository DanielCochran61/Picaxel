import axios from "axios";

function Auth () {
	let loggedIn = false;

	function logIn (username, password, cb) {
		axios.post("/api/authenticate", {username, password})
			.then(response => {
				console.log(response)
				localStorage.setItem("token", response.data.token);
				loggedIn = true;
				cb(response.data);
			})
			.catch(err => {
				console.log(err);
			});
	}

	function logOut (cb) {
		localStorage.removeItem("token");
		loggedIn = false;
		cb();
	}

	function getToken () {
		return localStorage.getItem("token");
	}

	function setUsername (username) {
		localStorage.setItem("username", username);
	}

	function getUsername () {
		return localStorage.getItem("username");
	}

	function isLoggedIn () {
		if(localStorage.getItem("token")) {
			return true;
		} else {
			return false;
		} 
	}

	return {
		isLoggedIn,
		logIn,
		logOut,
		getToken,
		setUsername,
		getUsername
	}
}

export default Auth();