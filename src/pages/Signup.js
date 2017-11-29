import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Button } from 'react-native';

class Singup extends Component {
    static navigationOptions = {
        title: 'Sign up',
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Text>Register form</Text>
            <Button title="LOGIN" onPress={() =>
                navigate('Login')}/>
        )
    }
}

export default Singup;