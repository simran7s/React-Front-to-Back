// Used 'rce' to generate class based component

import React, { Component } from 'react';

class UserItem extends Component {
  // Constructor is not manditory now

  // constructor(){
  //     // super is required in classes
  //     super();
  //     this.state = {
  //         id: 'id',
  //         login: 'mojombo',
  //         avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
  //         html_url: "https://github.com/mojombo"
  //     }
  // }

  // state = {
  //     id: 'id',
  //     login: 'mojombo',
  //     avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
  //     html_url: "https://github.com/mojombo"
  // }

  render() {
    // now we dont need to write this.state.___

    // we will now be using props.user to get this info
    const { login, avatar_url, html_url } = this.props.user;
    return (
      <div className="card text-center">
        <img
          src={avatar_url}
          alt=""
          className="round-img"
          style={{ width: '60px' }}
        />
        <h3>{login}</h3>

        <div>
          <a href={html_url} className="btn btn-dark btn-sm my-1">
            More
          </a>
        </div>
      </div>
    );
  }
}

export default UserItem;
