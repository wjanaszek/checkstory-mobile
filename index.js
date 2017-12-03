import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './src/pages/App';
import store from './src/redux';

export default class Checkstory extends Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('Checkstory', () => Checkstory);
