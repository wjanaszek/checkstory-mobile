import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Signup extends Component {
    render() {
        return (
            <View>
                <Text>Singup</Text>
                <Text>
                    If you already have an account, you can log in
                    <Text onPress={() => Actions.login()}> here</Text>
                </Text>
            </View>
        )
    }
}

export default Signup;