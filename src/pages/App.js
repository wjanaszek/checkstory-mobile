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
import { Actions } from 'react-native-router-flux';
import PopupModal from './modal/PopupModal';
import ImagePreviewModal from './modal/ImagePreviewModal';
import { ThemeProvider } from 'react-native-material-ui';

// you can set your style right here, it'll be propagated to application
const uiTheme = {
    palette: {
        primaryColor: 'blue',
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

export const initialRegion = {
    latitude: 52.22967,
    longitude: 21.01222,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

const App = () => (
    <ThemeProvider uiTheme={uiTheme}>
        <Router>
            <Scene key='root'>
                <Scene
                    hideNavBar
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
                    onRight={() => Actions.popup({
                        title: 'Logout',
                        message: 'Are you sure you want to logout?',
                        yesOptionMsg: 'LOGOUT',
                        noOptionMsg: 'CANCEL'
                    })}
                    rightTitle='LOGOUT'
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
                <Scene
                    hideNavBar
                    key='popup'
                    component={PopupModal}
                />
                <Scene
                    hideNavBar
                    key='imagePreview'
                    component={ImagePreviewModal}
                />
            </Scene>
        </Router>
    </ThemeProvider>
);

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        loading: state.auth.loading,
        error: state.auth.error
    };
};

export default connect(mapStateToProps) (App);