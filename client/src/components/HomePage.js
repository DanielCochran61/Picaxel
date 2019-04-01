import React from "react";
import MainCanvas from "./MainCanvas";
import Widget from './Widget';
import UserContext from "../context/UserContext";
import {Grid, Container, Header, Button, Icon} from 'semantic-ui-react';
const HomePage = (props) => (
	<div>
		<Grid container fluid columns={4}>
			<Grid.Column width={4} color='teal'>
				<Container textAlign='left'>
					<UserContext.Consumer>
						{context => (
							<Header as="h2">Welcome, {context.user.username}!</Header>
						)}
					</UserContext.Consumer>
				</Container>
			</Grid.Column>
			<Grid.Column width={4} color='teal'>
				<Container textAlign='left'>
					<Header as="h3">You have a pixel awaiting placement! <Icon color="blue" name="pin" /> </Header>
				</Container>
			</Grid.Column>
			<Grid.Column width={4} color='teal'>
				<Container textAlign='left'>
					<Header as="h3">Timer till next free pixel <Icon color="green" name='hourglass outline' /></Header>
				</Container>
			</Grid.Column>
			<Grid.Column width={4} color='teal'>
				<Container textAlign='left'>
					<Header as="h3">Challenge to unlock extra 5 pixels <Icon color="red" name="plus circle" /></Header>
					<Button animated='fade'>
						<Button.Content visible>Click Here</Button.Content>
						<Button.Content hidden>Do It</Button.Content>
					</Button>
				</Container>
			</Grid.Column>
		</Grid>
		<div>
			<Widget />
			<MainCanvas />
		</div>
	</div>
);
export default HomePage;