import React from 'react';
import { connect } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import StoryList from './StoryList';
import StoryDetail from './StoryDetail';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';

const App = () => (
    <Router>
        <Scene key='root'>
            <Scene
                key='home'
                component={Home}
                title='Home'
                initial
            />
            <Scene
                key='login'
                component={Login}
                title='Log in'
            />
            <Scene
                key='register'
                component={Signup}
                title='Sign up'
            />
            <Scene
                key='storyList'
                component={StoryList}
                title='Story list'
            />
            <Scene
                key='storyDetail'
                component={StoryDetail}
                title='Story detail'
            />
        </Scene>
    </Router>
);

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        loading: state.auth.loading,
        error: state.auth.error
    };
};

export default connect(mapStateToProps) (App);