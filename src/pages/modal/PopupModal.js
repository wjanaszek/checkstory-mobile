import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Modal from './BaseModal';
import { deleteStory } from '../../redux/actions/stories';

class PopupModal extends Component {
    constructor(props) {
        super(props);
    }

    deleteStory() {
        this.props.onStoryDelete(this.props.token, this.props.storyId);
    }

    render() {
        return (
            <Modal hideClose>
                <View flex={1} style={styles.popup}>
                    <Text>{this.props.title}</Text>
                    <Text>{this.props.message}</Text>
                    <Button title={this.props.noOptionMsg} onPress={Actions.pop} />
                    {this.props.title === 'Delete story' ? (<Button title={this.props.yesOptionMsg} onPress={() => this.deleteStory()} />) : null }
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

const mapStateToProps = (state, ownProps) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStoryDelete: (token, storyId) => dispatch(deleteStory(token, storyId))
    }
};

export default connect (mapStateToProps, mapDispatchToProps) (PopupModal);