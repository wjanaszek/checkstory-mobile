import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Application from './src/pages/Application';
import store from './src/redux';

export const apiUrl = 'http://10.0.2.2:8080';

export default class Checkstory extends Component {
    render() {
        return (
            <Provider store={store}>
                <Application />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('Checkstory', () => Checkstory);
