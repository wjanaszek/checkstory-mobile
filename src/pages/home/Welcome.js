import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class Welcome extends Component {
    render() {
        return (
            <View>
                <Text style={{fontSize: 16, position: 'justify'}}>
                    You are successfully registred. Log in
                    <Text style={{color: 'blue'}} onPress={() => Actions.login()}> here</Text>
                </Text>
            </View>
        )
    }
}

export default connect (Welcome);