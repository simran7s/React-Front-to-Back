import React, { Component } from 'react';
import PropTypes from 'prop-types'





export class Navbar extends Component {
    // Default props if we do not add any
    static defaultProps = {
        title: 'Insert Title',
        icon: 'fas fa-question-circle'
    }
 

    // Makes sure that our Prop's are of the correct type(string, const... etc)
    static propTypes = {
        title:PropTypes.string.isRequired,
        icon:PropTypes.string.isRequired
    }
    render() {
        return (
            <nav className="navbar bg-primary">
                <h1>
                    <i className={this.props.icon}></i> {this.props.title}
                </h1>
            </nav>
        )
    }
}

export default Navbar
