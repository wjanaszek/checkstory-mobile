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
import { logout } from '../../redux/actions/auth';
import { deletePhoto } from '../../redux/actions/photos';


class PopupModal extends Component {
    constructor(props) {
        super(props);
    }

    deletePhoto() {
        this.props.onPhotoDelete(this.props.token, this.props.storyId, this.props.photoId);
    }

    deleteStory() {
        this.props.onStoryDelete(this.props.token, this.props.storyId);
    }

    logout() {
        this.props.onLogout();
    }

    render() {
        return (
            <Modal hideClose>
                <View flex={1} style={styles.popup}>
                    <Text>{this.props.title}</Text>
                    <Text>{this.props.message}</Text>
                    <View style={styles.rowButtons}>
                        {this.props.title === 'Delete story' ? (<Button title={this.props.yesOptionMsg} onPress={() => this.deleteStory()} />) : null }
                        {this.props.title === 'Delete photo' ? (<Button title={this.props.yesOptionMsg} onPress={() => this.deletePhoto()} />) : null }
                        {this.props.title === 'Logout' ? (<Button title={this.props.yesOptionMsg} onPress={() => this.logout()} />) : null }
                        <Button title={this.props.noOptionMsg} onPress={Actions.pop} />
                    </View>
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
        onPhotoDelete: (token, storyId, photoId) => dispatch(deletePhoto(token, storyId, photoId)),
        onStoryDelete: (token, storyId) => dispatch(deleteStory(token, storyId)),
        onLogout: () => dispatch(logout())
    }
};

export default connect (mapStateToProps, mapDispatchToProps) (PopupModal);