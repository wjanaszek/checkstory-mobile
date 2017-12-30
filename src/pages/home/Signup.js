import React, { Component } from 'react';
import { Button, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { signUp } from '../../redux/actions/auth';
import { apiUrl } from '../../config/appConfig';

// Md5 for first step password hashing before sending it to API
let md5 = require('md5');

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            usernameError: false,
            usernameApiError: false,
            email: '',
            emailError: false,
            emailApiError: false,
            password: '',
            passwordError: false,
            repeatedPassword: '',
            repeatedPasswordError: false,
        }
    }

    formValid() {
        if (!this.state.username || this.state.usernameApiError || !this.state.email || this.state.emailApiError || !this.state.password || !this.state.repeatedPassword) {
            return false;
        } else {
            return true;
        }
    }

    signUp() {
        if (!this.formValid()) {
            return;
        }
        this.props.onSignUp(this.state.username, this.state.email, this.state.password);
    }

    render() {
        return(
            <ScrollView style={{padding: 20}}>
                <TextInput
                    placeholder='Username'
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={true}
                    keyboardType='email-address'
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })}
                    onEndEditing={() => {
                        if (!this.state.username) {
                            this.setState({ usernameError: true });
                        } else {
                            this.setState({ usernameError: false });
                            fetch(`${apiUrl}/api/users/checkLogin`, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }, body: this.state.username
                            })
                                .then(response => response.json())
                                .then(available => {
                                    if (!available) {
                                        this.setState({ usernameApiError: true });
                                    } else {
                                        this.setState({ usernameApiError: false });
                                    }
                                });
                        }
                    }}
                />
                { this.state.usernameError ? (<Text style={{color: 'red'}}>This field is required</Text>) : null }
                { this.state.usernameApiError ? (<Text style={{color: 'red'}}>This username is already in use</Text>) : null }
                <TextInput
                    placeholder='Email'
                    autoCapitalize='none'
                    autoCorrect={true}
                    autoFocus={false}
                    keyboardType='email-address'
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                    onEndEditing={() => {
                        if (!this.state.email) {
                            this.setState({ emailError: true });
                        } else {
                            this.setState({ emailError: false });
                            fetch(`${apiUrl}/api/users/checkEmail`, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }, body: this.state.email
                            })
                                .then(response => response.json())
                                .then(available => {
                                    if (!available) {
                                        this.setState({ emailApiError: true });
                                    } else {
                                        this.setState({ emailApiError: false });
                                    }
                                });
                        }}
                    }
                />
                { this.state.emailError ? (<Text style={{color: 'red'}}>This field is required</Text>) : null }
                { this.state.emailApiError ? (<Text style={{color: 'red'}}>This email is already in use</Text>) : null }
                <TextInput
                    placeholder='Password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={this.state.password}
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
                <TextInput
                    placeholder='Repeat password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={this.state.repeatedPassword}
                    onChangeText={(text) => this.setState({ repeatedPassword: text })}
                    onEndEditing={() => {
                        if (!(this.state.repeatedPassword || this.state.password) || this.state.password !== this.state.repeatedPassword) {
                            this.setState({ repeatedPasswordError: true });
                        } else {
                            this.setState({ repeatedPasswordError: false });
                        }
                    }}
                />
                { this.state.repeatedPasswordError ? (<Text style={{color: 'red'}}>This field is required and has to match with password field</Text>) : null }
                { !this.props.loading ?
                    (<Button onPress={() => this.signUp()} title='REGISTER'/>) :
                    (<TouchableOpacity disabled={true}>
                        <Text>Registering...</Text>
                    </TouchableOpacity>)}
                { this.props.error ? (<Text style={{color: 'red'}}>{this.props.error}</Text>) : null }
            </ScrollView>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignUp: (username, email, password) => dispatch(signUp(username, email, md5(password)))
    };
};

export default connect (mapStateToProps, mapDispatchToProps) (Signup);