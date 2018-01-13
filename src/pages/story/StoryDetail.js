import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    TouchableOpacity, ScrollView, Text, StyleSheet, FlatList,
    ActivityIndicator, View
} from 'react-native';
import { comparePhotos, createPhoto, deletePhoto, updatePhoto } from '../../redux/actions/photos';
import { List } from 'react-native-elements';
import PhotoListItem from './PhotoListItem';
import Photo from '../../model/Photo';
import { deleteStory } from '../../redux/actions/stories';
import StoryActionButton from './StoryActionButton';
import { Actions } from 'react-native-router-flux';

const ImagePicker = require('react-native-image-picker');

const options = {
    title: 'Select photo',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

class StoryDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.story.id,
            title: this.props.story.title,
            notes: this.props.story.notes,
            longitude: this.props.story.longitude,
            latitude: this.props.story.latitude,
            createDate: this.props.story.createDate,
            photo: null,
            photosToCompare: [],
            opened: false
        };
        this.addPhoto = this.addPhoto.bind(this);
        this.checkboxValueChanged = this.checkboxValueChanged.bind(this);
        this.compareTwoPhotos = this.compareTwoPhotos.bind(this);
    }

    addPhoto() {
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel || response.error) {
                console.log('Error or cancel');
            }
            else {
                let source = { uri: response.uri };
                // console.log(JSON.stringify(source));

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    photo: new Photo(response.type.split('/')[1], response.data)
                });
                this.props.onPhotoAdd(this.props.token, this.state.id, this.state.photo);
            }
        });
    }

    checkboxValueChanged(id) {
        if (this.state && this.state.photosToCompare && this.state.photosToCompare.length) {
            const index = this.state.photosToCompare.findIndex(photoId => photoId === id);
            if (index === -1) {
                this.setState({ photosToCompare: this.state.photosToCompare.concat([id]) });
            } else {
                this.setState({ photosToCompare: this.state.photosToCompare.filter(photoId => photoId !== id) });
            }
        } else {
            this.setState({ photosToCompare: this.state.photosToCompare.concat([id]) });
        }
    }

    compareTwoPhotos() {
        // console.log('photosToCompare: ' + JSON.stringify(this.state.photosToCompare));
        if (this.state.photosToCompare.length > 2) {
            // user choosed too many photos to compare
            Actions.popup({
                title: 'Error',
                message: 'You can compare only two photos',
                yesOptionMsg: 'OK',
            });
        } else if (this.state.photosToCompare.length === 0) {
            // user choosed 0 photos to compare
            Actions.popup({
                title: 'Error',
                message: 'You haven\'t choosen any photo. Choose two photos to compare',
                yesOptionMsg: 'OK',
            });
        } else if (this.state.photosToCompare.length === 1) {
            // user choosed only 1 photo to compare
            Actions.popup({
                title: 'Error',
                message: 'You have choosen only one photo. Choose second one to compare',
                yesOptionMsg: 'OK',
            })
        } else {
            // user choosed 2 photos to compare
            this.props.onPhotoCompare(this.props.token, this.state.photosToCompare[0], this.state.photosToCompare[1]);
            Actions.popup({
                title: 'Comparing photos',
                noOptionMsg: 'OK'
            });
        }
    }

    render() {
        return (
            <ScrollView style={{flex: 1, padding: 10}}>
                <TouchableOpacity disabled={true}>
                    <Text style={styles.labelStyle}>Title</Text>
                    <Text>{this.state.title}</Text>
                    <Text style={styles.labelStyle}>Notes</Text>
                    <Text>{this.state.notes}</Text>
                    <Text style={styles.labelStyle}>Longitude</Text>
                    <Text>{`${this.state.longitude}`}</Text>
                    <Text style={styles.labelStyle}>Latitude</Text>
                    <Text>{`${this.state.latitude}`}</Text>
                    <Text style={styles.labelStyle}>Create date</Text>
                    <Text>{this.state.createDate}</Text>
                </TouchableOpacity>
                {this.props.loadingPhotos ?
                (<ActivityIndicator size='large' color='rgba(33, 150, 243, 1)'/>) :
                (<List>
                    <FlatList
                        data={this.props.photos}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <PhotoListItem
                                imageType={item.imageType}
                                content={item.content}
                                createDate={item.createDate}
                                photoId={item.id}
                                storyId={this.state.id}
                                onCheckboxValueChange={this.checkboxValueChanged}
                            />
                        )}
                    />
                </List>)}
                {this.props.photos.length ? null : (<View style={{height: 300}}/>)}
                <StoryActionButton addPhoto={this.addPhoto} story={this.state} comparePhotos={this.compareTwoPhotos}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    labelStyle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 7
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white'
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        comparedPhotos: state.story.comparedPhotos,
        error: state.auth.error,
        loading: state.stories.loading,
        loadingPhotos: state.story.loading,
        photos: state.story.photos,
        token: state.auth.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPhotoCompare: (token, firstPhotoId, secondPhotoId) => dispatch(comparePhotos(token, firstPhotoId, secondPhotoId)),
        onPhotoAdd: (token, storyId, photo) => dispatch(createPhoto(token, storyId, photo)),
        onPhotoDelete: (token, storyId, photoId) => dispatch(deletePhoto(token, storyId, photoId)),
        onPhotoEdit: (token, storyId, photo) => dispatch(updatePhoto(token, storyId, photo.id, photo)),
        onStoryDelete: (token, storyId) => dispatch(deleteStory(token, storyId)),
    }
};

export default connect (mapStateToProps, mapDispatchToProps) (StoryDetail);