import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';

class Signup extends Component {
    static navigationOptions = {
        title: 'Sign up',
    };

    render() {
        return (
            <View>
                <Text>Singup</Text>
            </View>
        )
    }
}

export default Signup;