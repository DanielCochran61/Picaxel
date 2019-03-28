import React from "react";
import UserContext from "../context/UserContext";
import MainCanvas from "./MainCanvas";
import {
	Button,
	Container,
	Header,
	Icon,
	Grid,
	// Image,
	// Item,
	// Label,
	// Menu,
	// Segment,
	// Step,
	// Table,
} from 'semantic-ui-react'

class HomePage extends React.Component {
	state = {
		username: "",
	}

	render() {
		return (
			<Grid container columns={2}>
				<Grid.Column>
					<MainCanvas/>

				</Grid.Column>
				<Grid.Column>
					<Container fluid>
						<UserContext.Consumer>
							 {context => (
								<Header as="h2">Welcome, {context.user.username}!</Header>
								)}  
						</UserContext.Consumer>
						<Grid.Row>
							<Header as="h3">You have a pixel awaiting placement! </Header>
							<Icon color="blue" name="pin" />
						</Grid.Row>
						<Grid.Row>
							<Header as="h3">Timer till next free pixel </Header>
							<Icon color="green" name='hourglass outline' />
						</Grid.Row>
						<Grid.Row>
							<Header as="h3">Challenge to unlock extra 5 pixels </Header>
							<Icon color="red" name="plus circle" />
						</Grid.Row>
						<Grid.Row>
							<Button animated='fade'>
								<Button.Content visible>Click Here</Button.Content>
								<Button.Content hidden>Do It</Button.Content>
							</Button>
						</Grid.Row>
					</Container>
				</Grid.Column>
			</Grid>
		)
	}

}
export default HomePage;