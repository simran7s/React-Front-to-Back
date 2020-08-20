import React, { Component } from 'react';
import './App.css';
import Users from './components/users/Users';
import Navbar from './components/layout/Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* We just gave props title, icon to the navbar component */}
        <Navbar title="Github Finder" icon="fab fa-github" />
        <div className="container">
          <Users />
        </div>
      </div>
    );
  }
}

export default App;
