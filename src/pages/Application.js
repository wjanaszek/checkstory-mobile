import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { NativeRouter, Route, Link, Redirect, withRouter } from 'react-router-native';
import StoryList from './StoryList';
import StoryDetail from './StoryDetail';
import Signup from './Signup';
import Login from './Login';

const App = () => (
    <NativeRouter>
        <View style={styles.container}>
            <View>
                <Link
                    to='/login'>
                    <Text>Log in</Text>
                </Link>
                <Text> or </Text>
                <Link
                    to='/signup'>
                    <Text>Register</Text>
                </Link>
            </View>

            <Route path='/login' component={Login}/>
            <Route path='/signup' component={Signup}/>
            <PrivateRoute path='/dashboard' component={Dashboard}/>
        </View>
    </NativeRouter>
);

const Dashboard = ({ match }) => (
    <View>
        <Route path={match.url + '/story-list'} component={StoryList}/>
        <Route path={match.url + '/story-detail/:id'} component={StoryDetail}/>
    </View>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        props.isLoggedIn ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
);

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        padding: 10,
    },
    header: {
        fontSize: 20,
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    btn: {
        width: 200,
        backgroundColor: '#E94949',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        loading: state.auth.loading,
        error: state.auth.error
    };
};

export default connect(mapStateToProps) (App);