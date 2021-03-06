import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, CheckBox, Image, Text, TouchableOpacity, View } from 'react-native';
import { loadPhoto, updatePhoto } from '../../redux/actions/photos';
import { Actions } from 'react-native-router-flux';
import Photo from '../../model/Photo';
// import { CheckBox } from 'react-native-elements';

const ImagePicker = require('react-native-image-picker');

const options = {
    title: 'Select new photo',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

class PhotoListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: null,
            checked: false
        }
    }

    deletePhoto() {
        Actions.popup({
            title: 'Delete photo',
            message: 'Are you sure you want delete this photo?',
            noOptionMsg: 'NO',
            yesOptionMsg: 'DELETE',
            storyId: this.props.storyId,
            photoId: this.props.photoId
        })
    }

    editPhoto() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel || response.error) {
                console.log('Error or cancel');
            }
            else {
                let source = {uri: response.uri};
                console.log(JSON.stringify(source));

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    photo: new Photo(response.type.split('/')[1], response.data)
                });
                this.props.onPhotoEdit(this.props.token, this.props.storyId, this.props.photoId, this.state.photo);
            }
        });
    }

    onCheckboxValueChange(id) {
        this.setState({checked: !this.state.checked});
        this.props.onCheckboxValueChange(id);
    }

    render() {
        return (
            <View style={{borderBottomWidth: 1, borderColor: 'black', marginTop: 5}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity
                        onPress={() => {
                            // @TODO add action to load full resolution image
                            // this.props.onPhotoLoad(this.props.token, this.props.storyId, this.props.photoId)
                            Actions.imagePreview({
                                imageType: this.props.imageType,
                                content: this.props.content
                            });
                        }}>
                        <Image
                            style={{
                                width: 300,
                                height: 130,
                                resizeMode: Image.resizeMode.contain,
                                borderRadius: 5,
                                marginBottom: 5
                            }}
                            source={{uri: `data:image/${this.props.imageType};base64,${this.props.content}`}}/>
                    </TouchableOpacity>
                </View>
                <View style={{marginLeft: 5}}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <View>
                            <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'left'}}>Create date</Text>
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text style={{fontSize: 16, textAlign: 'left'}}>{this.props.createDate}</Text>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        flexDirection: 'row'
                    }}>
                        <View style={{marginRight: 15}}>
                            <Button title='DELETE' onPress={() => this.deletePhoto()}/>
                        </View>
                        <View>
                            <Button title='EDIT' onPress={() => this.editPhoto()}/>
                        </View>
                        <View style={{marginLeft: 10}}>
                            <CheckBox
                                value={this.state.checked}
                                onValueChange={() => this.onCheckboxValueChange(this.props.photoId)}/>
                        </View>
                        <View style={{marginLeft: 3}}>
                            <Text>Compare</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        error: state.auth.error,
        loading: state.stories.loading,
        token: state.auth.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPhotoEdit: (token, storyId, photoId, photo) => dispatch(updatePhoto(token, storyId, photoId, photo)),
        onPhotoLoad: (token, storyId, photoId) => dispatch(loadPhoto(token, storyId, photoId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoListItem);