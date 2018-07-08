import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, TextInput, View, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { login } from '../../redux/actions/auth';
import { Actions } from 'react-native-router-flux';

// Md5 for first step password hashing before sending it to API
// @TODO remove this?
let md5 = require('md5');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            usernameError: false,
            password: '',
            passwordError: false
        }
    }

    formValid() {
        if (!this.state.username || !this.state.password) {
            return false;
        } else {
            return true;
        }
    }

    userLogin() {
        if (!this.formValid()) {
            return;
        }
        console.log(this.state.username, this.state.password);
        this.props.onLogin(this.state.username, this.state.password);
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
                    returnKeyType='next'
                    onSubmitEditing={() => this.refs.pswd.focus()}
                    onChangeText={(text) => this.setState({ username: text })}
                    onEndEditing={() => {
                        if (!this.state.username) {
                            this.setState({ usernameError: true });
                        } else {
                            this.setState({ usernameError: false });
                        }
                    }}
                />
                { this.state.usernameError ? (<Text style={{color: 'red'}}>This field is required</Text>) : null }
                <TextInput
                    ref='pswd'
                    onPress={() => this.refs.pswd.focus()}
                    placeholder='Password'
                    autoCapitalize='none'
                    returnKeyType='go'
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={this.state.password}
                    onSubmitEditing={() => this.userLogin(null)}
                    onChangeText={(text) => this.setState({ password: text })}
                    onEndEditing={() => {
                        if (!this.state.password) {
                            this.setState({ passwordError: true });
                        } else {
                            this.setState({ passwordError: false });
                        }
                    }}
                />
                { this.state.passwordError ? (<Text style={{color: 'red'}}>This field is required</Text>) : null }
                <View style={{margin: 7}}/>
                {!this.props.loading ?
                    (<Button onPress={() => this.userLogin()} title='LOGIN'/>) :
                    (<TouchableOpacity disabled={true}>
                        <ActivityIndicator size='large' color='blue'/>
                        <Text>Logging in...</Text>
                    </TouchableOpacity>)}
                { this.props.error ? (<Text style={{color: 'red'}}>{this.props.error}</Text>) : null }
                <Text style={{fontSize: 16}}>
                    If you don't have an account, you can sign up
                    <Text style={{color: 'blue'}} onPress={() => Actions.register()}> here</Text>
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
        onLogin: (username, password) => dispatch(login(username, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Login);