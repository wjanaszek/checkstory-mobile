import React from 'react';
import { connect } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import StoryList from './story/StoryList';
import StoryDetail from './story/StoryDetail';
import Signup from './home/Signup';
import Login from './home/Login';
import Home from './home/Home';
import StoryAdd from './story/StoryAdd';
import StoryEdit from './story/StoryEdit';
import MoreVertButton from './custom-buttons/MoreVertButton';

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
                renderRightButton={MoreVertButton}
            />
            <Scene
                key='storyDetail'
                component={StoryDetail}
                title='Story detail'
            />
            <Scene
                key='storyAdd'
                component={StoryAdd}
                title='Add story'
            />
            <Scene
                key='storyEdit'
                component={StoryEdit}
                title='Edit story'
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