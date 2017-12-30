import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TouchableOpacity, ScrollView, Text, StyleSheet, View, FlatList, Image } from 'react-native';
import { createPhoto, deletePhoto, updatePhoto } from '../../redux/actions/photos';
import { Actions } from 'react-native-router-flux';
import { Divider, List } from 'react-native-elements';
import PhotoListItem from './PhotoListItem';
import Photo from '../../model/Photo';
import { deleteStory } from '../../redux/actions/stories';

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
            comparingEnabled: false,
            photo: null
        }
    }

    addPhoto() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel || response.error) {
                console.log('Error or cancel');
            }
            else {
                let source = { uri: response.uri };
                console.log(JSON.stringify(source));

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    photo: new Photo(response.type.split('/')[1], response.data)
                });
                this.props.onPhotoAdd(this.props.token, this.state.id, this.state.photo);
            }
        });
    }

    render() {
        return (
            <ScrollView style={{padding: 10}}>
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
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{fontSize: 15, marginTop: 7, marginRight: 30}}>Actions: </Text>
                    <View style={{marginRight: 15, marginBottom: 10, width: 70}}>
                        <Button title='EDIT' onPress={() => Actions.storyEdit({ story: this.state })}/>
                    </View>
                    <View style={{marginLeft: 15, marginBottom: 10, width: 70}}>
                        <Button title='DELETE' onPress={() => Actions.popup({
                            title: 'Delete story',
                            message: 'Are you sure you want delete this story?',
                            noOptionMsg: 'NO',
                            yesOptionMsg: 'YES',
                            storyId: this.state.id,
                        })}/>
                    </View>
                </View>
                <Divider style={{backgroundColor: 'black', marginBottom: 10}}/>
                {!this.props.loading ?
                    (<Button title='ADD PHOTO' onPress={() => this.addPhoto()} style={{marginTop: 10}}/>) :
                    (<TouchableOpacity disabled={true}>
                        <Text>Adding photo...</Text>
                    </TouchableOpacity>)}
                {this.props.loadingPhotos ?
                    (<Text>Loading photos...</Text>) :
                    (<List>
                        <FlatList
                            data={this.props.photos}
                            renderItem={({ item }) => (
                                <PhotoListItem
                                    imageType={item.imageType}
                                    content={item.content}
                                    createDate={item.createDate}
                                    keyExtractor={item.id}
                                    photoId={item.id}
                                    storyId={this.state.id}
                                />
                            )}
                        />
                    </List>)}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    labelStyle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 7
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        error: state.auth.error,
        loading: state.stories.loading,
        loadingPhotos: state.story.loading,
        photos: state.story.photos,
        token: state.auth.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStoryDelete: (token, storyId) => dispatch(deleteStory(token, storyId)),
        onPhotoAdd: (token, storyId, photo) => dispatch(createPhoto(token, storyId, photo)),
        onPhotoDelete: (token, storyId, photoId) => dispatch(deletePhoto(token, storyId, photoId)),
        onPhotoEdit: (token, storyId, photo) => dispatch(updatePhoto(token, storyId, photo.id, photo))
    }
};

export default connect (mapStateToProps, mapDispatchToProps) (StoryDetail);