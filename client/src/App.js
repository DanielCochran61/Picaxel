import React, { Component } from 'react';
import HomePage from'./components/homepage';
import LoginPage from'./components/loginpage';
import './App.css';

class App extends Component {
  render() {
    return (
     <Header>
       <Route path="/" component={LoginPage} />
       <Route path="/home" component={HomePage} />
     </Header>
    );
  }
}

export default App;
