import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TouchableOpacity, ScrollView, Text, StyleSheet, View, FlatList, Image } from 'react-native';
import { createPhoto } from '../../redux/actions/photos';
import { Actions } from 'react-native-router-flux';
import { List } from 'react-native-elements';
import PhotoListItem from './PhotoListItem';

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
            photo: null
        }
    }

    addPhoto() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    photo: source
                });
            }
        });
    }

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <View style={styles.rowButtons}>
                    <Button title='EDIT' onPress={() => Actions.storyEdit({ story: this.state })} style={{width: '50%'}}/>
                    <Button title='DELETE' onPress={() => Actions.popup({
                        title: 'Delete story',
                        message: 'Are you sure you want delete this story?',
                        noOptionMsg: 'NO',
                        yesOptionMsg: 'YES',
                        storyId: this.state.id
                    })} style={{width: '50%'}}/>
                </View>
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
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <PhotoListItem
                                    imageType={item.imageType}
                                    content={item.content}
                                    createDate={item.createDate}
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
        photos: state.story.photos
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPhotoAdd: (token, storyId, photo) => dispatch(createPhoto(token, storyId, photo))
    }
};

export default connect (mapStateToProps, mapDispatchToProps) (StoryDetail);