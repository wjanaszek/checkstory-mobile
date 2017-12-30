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
                <View style={styles.popup}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>{this.props.title}</Text>
                    <Text>{this.props.message}</Text>
                    <View style={{flexDirection: 'row'}}>
                        { this.props.title === 'Delete story' ? (
                            <View style={styles.marginButtons}>
                                <Button title={this.props.yesOptionMsg} onPress={() => this.deleteStory()} />
                            </View>) : null }
                        { this.props.title === 'Delete photo' ? (
                            <View style={styles.marginButtons}>
                                <Button title={this.props.yesOptionMsg} onPress={() => this.deletePhoto()} />
                            </View>) : null }
                        { this.props.title === 'Error' ? (
                            <View style={styles.marginButtons}>
                                <Button title={this.props.yesOptionMsg} onPress={() => Actions.pop()} />
                            </View>) : null }
                        { this.props.title === 'Signup success' ? (
                            <View style={styles.marginButtons}>
                                <Button title={this.props.yesOptionMsg} onPress={() => Actions.reset('home')}/>
                            </View>) : null }
                        { this.props.title === 'Logout' ? (
                            <View style={styles.marginButtons}>
                                <Button title={this.props.yesOptionMsg} onPress={() => this.logout()} />
                            </View>) : null }
                        { this.props.title !== 'Error' && this.props.title !== 'Signup success' ? (
                            <View style={styles.marginButtons}>
                                <Button title={this.props.noOptionMsg} onPress={() => Actions.pop()} />
                            </View>) : null }
                    </View>
                </View>
            </Modal>)
    }
}

const styles = StyleSheet.create({
    popup: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20
    },
    marginButtons: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 5
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