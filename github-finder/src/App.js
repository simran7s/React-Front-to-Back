import React, { Component } from 'react';
import './App.css';
import Users from './components/users/Users';
import Navbar from './components/layout/Navbar';
import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  // Runs when app component mounts(on load)
  async componentDidMount() {
    // While fetching data, setState of loading to true(for loading wheel to be called)
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    // After data is recieved, setState of users to data recieve and turn off the loading wheel
    this.setState({ users: res.data, loading: false });
  }

  render() {
    return (
      <div className="App">
        {/* We just gave props title, icon to the navbar component */}
        <Navbar title="Github Finder" icon="fab fa-github" />
        <div className="container">
          {/* We now pass our state as props to Users component */}
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
