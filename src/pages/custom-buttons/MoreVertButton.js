import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

class MoreVertButton extends Component {
    render() {
        return(
            <View>
                <TouchableOpacity onPress={() => Actions.popup({
                        title: 'Logout',
                        message: 'Are you sure you want to logout?',
                        yesOptionMsg: 'LOGOUT',
                        noOptionMsg: 'CANCEL'
                    })}>
                    <Icon name='account-circle'/>
                </TouchableOpacity>
            </View>
        )
    }
}

export default MoreVertButton;