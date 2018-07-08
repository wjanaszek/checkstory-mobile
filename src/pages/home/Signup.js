import React, { Component } from 'react';
import { Button, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { signUp } from '../../redux/actions/auth';
import { apiUrl, endpoints } from '../../config/appConfig';

// Md5 for first step password hashing before sending it to API
// @TODO remove this?
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
        if (!this.formValid() || this.state.password !== this.state.repeatedPassword) {
            return;
        }
        this.props.onSignUp(this.state.username, this.state.email, this.state.password);
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
                    onSubmitEditing={() => this.refs.em.focus()}
                    onChangeText={(text) => this.setState({username: text})}
                    onEndEditing={() => {
                        if (!this.state.username) {
                            this.setState({usernameError: true});
                        } else {
                            this.setState({usernameError: false});
                            fetch(`${endpoints.checkUsername}`, {
                                method: 'GET',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }, body: this.state.username
                            })
                                .then(response => response.json())
                                .then(available => {
                                    if (!available) {
                                        this.setState({usernameApiError: true});
                                    } else {
                                        this.setState({usernameApiError: false});
                                    }
                                });
                        }
                    }}
                />
                {this.state.usernameError ? (<Text style={{color: 'red'}}>This field is required</Text>) : null}
                {this.state.usernameApiError ? (
                    <Text style={{color: 'red'}}>This username is already in use</Text>) : null}
                <TextInput
                    placeholder='Email'
                    ref='em'
                    autoCapitalize='none'
                    autoCorrect={true}
                    autoFocus={false}
                    keyboardType='email-address'
                    value={this.state.email}
                    returnKeyType='next'
                    onSubmitEditing={() => this.refs.pswd.focus()}
                    onChangeText={(text) => this.setState({email: text})}
                    onEndEditing={() => {
                        if (!this.state.email) {
                            this.setState({emailError: true});
                        } else {
                            this.setState({emailError: false});
                            fetch(`${endpoints.checkEmail}`, {
                                method: 'GET',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }, body: this.state.email
                            })
                                .then(response => response.json())
                                .then(available => {
                                    if (!available) {
                                        this.setState({emailApiError: true});
                                    } else {
                                        this.setState({emailApiError: false});
                                    }
                                });
                        }
                    }
                    }
                />
                {this.state.emailError ? (<Text style={{color: 'red'}}>This field is required</Text>) : null}
                {this.state.emailApiError ? (<Text style={{color: 'red'}}>This email is already in use</Text>) : null}
                <TextInput
                    placeholder='Password'
                    ref='pswd'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    returnKeyType='next'
                    value={this.state.password}
                    onSubmitEditing={() => this.refs.rpswd.focus()}
                    onChangeText={(text) => this.setState({password: text})}
                    onEndEditing={() => {
                        if (!this.state.password) {
                            this.setState({passwordError: true});
                        } else {
                            this.setState({passwordError: false});
                        }
                    }}
                />
                {this.state.passwordError ? (<Text style={{color: 'red'}}>This field is required</Text>) : null}
                <TextInput
                    placeholder='Repeat password'
                    ref='rpswd'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    returnKeyType='go'
                    value={this.state.repeatedPassword}
                    onSubmitEditing={() => this.signUp()}
                    onChangeText={(text) => this.setState({repeatedPassword: text})}
                    onEndEditing={() => {
                        if (!(this.state.repeatedPassword || this.state.password) || this.state.password !== this.state.repeatedPassword) {
                            this.setState({repeatedPasswordError: true});
                        } else {
                            this.setState({repeatedPasswordError: false});
                        }
                    }}
                />
                {this.state.repeatedPasswordError ? (
                    <Text style={{color: 'red'}}>This field is required and has to match with password
                        field</Text>) : null}
                {!this.props.loading ?
                    (<Button onPress={() => this.signUp()} title='SIGN UP'/>) :
                    (<TouchableOpacity disabled={true}>
                        <Text>Registering...</Text>
                    </TouchableOpacity>)}
                {this.props.error ? (<Text style={{color: 'red'}}>{this.props.error}</Text>) : null}
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
        onSignUp: (username, email, password) => dispatch(signUp(username, email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);