import React from "react";
import UserContext from "../context/UserContext";
import MainCanvas from "./MainCanvas";
const HomePage = (props) => (
	<MainCanvas />
	// <UserContext.Consumer>
	// 	{context => {
	// 		return <div>
	// 			<h1>Lets Start Making Art Toegther!! (protected)</h1>
	// 			<h2>Welcome, {context.user.username}!</h2>
	// 		</div>
	// 	}}
	// </UserContext.Consumer>
);

export default HomePage;