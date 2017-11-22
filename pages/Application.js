import { connect } from 'react-redux';
import React, { Component } from 'react';
import Secured from './Secured';
import Login from './Login';

class Application extends Component {
    render() {
        if (this.props.isLoggedIn) {
            return <Secured />;
        } else {
            return <Login />;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
};

export default connect (mapStateToProps) (Application);