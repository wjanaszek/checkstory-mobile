import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

class StoryActionButton extends Component {
    render() {
        return (
            <ActionButton buttonColor='rgba(231,76,60,1)'>
                <ActionButton.Item buttonColor='#9b59b6' title='Add photo' onPress={() => this.props.addPhoto()}>
                    <Icon name='md-photos' style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='rgba(255, 0, 0, 1)' title='Delete story' onPress={() => Actions.popup({
                    title: 'Delete story',
                    message: 'Are you sure you want delete this story?',
                    noOptionMsg: 'NO',
                    yesOptionMsg: 'YES',
                    storyId: this.props.story.id,
                })}>
                    <Icon name='md-remove' style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='rgba(200, 100, 0, 1)' title='Edit story' onPress={() => Actions.storyEdit({ story: this.props.story })}>
                    <Icon name='md-create' style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='rgba(0, 255, 0, 1)' title='Compare selected photos' onPress={() => this.props.comparePhotos()}>
                    <Icon name='md-add' style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        )
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white'
    }
});

export default StoryActionButton;