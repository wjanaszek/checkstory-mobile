import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import { login, signUp } from '../redux/actions/auth';

// Md5 for first step password hashing before sending it to API
let md5 = require('md5');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            route: 'Login',
            username: '',
            password: ''
        }
    }

    state = {
        redirectToReferrer: false
    };

    userLogin(e) {
        this.props.onLogin(this.state.username, this.state.password);
        e.preventDefault();
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        return (
            <ScrollView style={{padding: 20}}>
                <Text style={{fontSize: 27}}>{this.state.route}</Text>
                <TextInput
                    placeholder='Username'
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={true}
                    keyboardType='email-address'
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })} />
                <TextInput
                    placeholder='Password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}/>
                <View style={{margin: 7}}/>
                {!this.props.loading ?
                    (<Button onPress={(e) => this.userLogin(e)} title='LOGIN'/>) :
                    (<TouchableOpacity disabled={true}>
                        <Text>Logging in...</Text>
                    </TouchableOpacity>)}
                {this.props.error ? (<Text style={{color: 'red'}}>{this.props.error}</Text>) : null}
                <Text style={{fontSize: 16}}>If you don't have an account, you can sign up
                    <Text style={{fontSize: 16, color: 'blue'}} onPress={(e) => console.log('go to registration form')}> here</Text>
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