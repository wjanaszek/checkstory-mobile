import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import { login } from '../redux/actions/auth';
import { Link, Redirect } from 'react-router-native';

// Md5 for first step password hashing before sending it to API
let md5 = require('md5');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            route: 'Login',
            username: '',
            password: '',
            redirectToReferrer: false
        }
    }

    userLogin(e) {
        this.props.onLogin(this.state.username, this.state.password);
        e.preventDefault();
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        return (
            <ScrollView style={{padding: 20}}>
                {/*{ from.pathname ? (<Text>You have to log in first, to see {from.pathname}</Text>) : null }*/}
                {/*<Text style={{fontSize: 27}}>{this.state.route}</Text>*/}
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
                <Text style={{fontSize: 16}}>If you don't have an account, you can sign up</Text>
                <Link to='/signup'>
                    <Text>here</Text>
                </Link>

                {this.props.isLoggedIn ? (<Redirect to='/dashboard/story-list'/>) : null}
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