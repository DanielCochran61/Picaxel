import React from "react";
// import UserContext from "../context/UserContext";
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
// import {
// 	Button,
// 	Container,
// 	Grid,
// 	Header,
// 	Icon,
// 	Image,
// 	Item,
// 	Label,
// 	Menu,
// 	Segment,
// 	Step,
// 	Table,
// } from 'semantic-ui-react'

// class HomePage extends React.Component {
// 	state = {
// 		username: "",
// 	}

// 	render() {
// 		return (
// 			<div class="ui fluid container">
// 				<UserContext.Consumer>
// 					{context => {
// 						<header>
// 							<h3>Welcome, {context.user.username}!</h3>
// 						</header>
// 					}}
// 				</UserContext.Consumer>
// 				<h5>You have a pixel awaiting placement</h5>
// 				<h5>Timer till next free pixel</h5>
// 				<h5>Challenge to unlock extra 5 pixels</h5>
// 				<div>
// 					<button class="ui animated button">
// 						<div class="visible content">
// 							Click here
// 						</div>
// 						<div class="hidden content">
// 							Do it
// 						</div>
// 					</button>
// 				</div>

// 			</div>

// 		)
// 	}


// }
export default HomePage;