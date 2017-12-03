import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import { login } from '../../redux/actions/auth';
import { Actions } from 'react-native-router-flux';

// Md5 for first step password hashing before sending it to API
let md5 = require('md5');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    userLogin(e) {
        this.props.onLogin(this.state.username, this.state.password);
        e.preventDefault();
        Actions.home();
    }

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <TextInput
                    placeholder='Username'
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={true}
                    keyboardType='email-address'
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })}
                />
                <TextInput
                    placeholder='Password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                />
                <View style={{margin: 7}}/>
                {!this.props.loading ?
                    (<Button onPress={(e) => this.userLogin(e)} title='LOGIN'/>) :
                    (<TouchableOpacity disabled={true}>
                        <Text>Logging in...</Text>
                    </TouchableOpacity>)}
                {this.props.error ? (<Text style={{color: 'red'}}>{this.props.error}</Text>) : null}
                <Text style={{fontSize: 16}}>
                    If you don't have an account, you can sign up
                    <Text style={{color: 'blue'}}onPress={() => Actions.register()}> here</Text>
                </Text>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (username, password) => dispatch(login(username, md5(password)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Login);