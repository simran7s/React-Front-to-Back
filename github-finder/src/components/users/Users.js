import React, { Component } from 'react';
import UserItem from './UserItem';

class Users extends Component {
  render() {
    return (
      <div style={userStyle}>
        {/* Change this.state to this.props to get state from props now */}
        {this.props.users.map((user) => (
          // We need a key that is unique to each user when using map
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
}

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
};

export default Users;
