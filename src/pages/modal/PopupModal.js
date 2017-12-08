import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from './BaseModal';

class PopupModal extends Component {
    render() {
        return (
            <Modal hideClose>
                <View flex={1} style={styles.popup}>
                    <Text>Popup Modal</Text>
                    <Text>Slides up from the bottom, and covers the entire screen with no transparency</Text>
                    <Button title='Close' onPress={Actions.pop} />
                </View>
            </Modal>)
    }
}

const styles = StyleSheet.create({
    popup: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20
    }
});


export default PopupModal;