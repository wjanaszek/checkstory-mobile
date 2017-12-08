import React, { Component } from 'react';
import { Button, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { signUp } from '../../redux/actions/auth';

// Md5 for first step password hashing before sending it to API
let md5 = require('md5');

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            repeatedPassword: ''
        }
    }

    signUp() {
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
                />
                <TextInput
                    placeholder='Email'
                    autoCapitalize='none'
                    autoCorrect={true}
                    autoFocus={false}
                    keyboardType='email-address'
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                />
                <TextInput
                    placeholder='Password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                />
                <TextInput
                    placeholder='Repeat password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={this.state.repeatedPassword}
                    onChangeText={(text) => this.setState({ repeatedPassword: text })}
                />
                {!this.props.loading ?
                    (<Button onPress={() => this.signUp()} title='REGISTER'/>) :
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
        onSignUp: (username, email, password) => dispatch(signUp(username, email, md5(password)))
    };
};

export default connect (mapStateToProps, mapDispatchToProps) (Signup);