import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Image, Text, View } from 'react-native';
import { deletePhoto, updatePhoto } from '../../redux/actions/photos';
import { Actions } from 'react-native-router-flux';

class PhotoListItem extends Component {
    deletePhoto() {
        Actions.popup({
            title: 'Delete photo',
            message: 'Are you sure you want delete this story?',
            noOptionMsg: 'NO',
            yesOptionMsg: 'YES',
            storyId: this.props.storyId,
            photoId: this.props.photoId
        })
    }

    render() {
        return(
            <View style={{borderBottomWidth: 1, borderColor: 'black', marginTop: 5}}>
                <View>
                    <Image
                        style={{width: 300, height: 150, resizeMode: Image.resizeMode.contain, borderRadius: 5, marginBottom: 5}}
                        source={{uri: `data:image/${this.props.imageType};base64,${this.props.content}`}} />
                </View>
                <View style={{marginLeft: 5}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'left'}}>Date</Text>
                    <Text style={{flex: 1, fontSize: 16, textAlign: 'left'}}>{this.props.createDate}</Text>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', flexDirection: 'row'}}>
                        <Button title='DELETE' onPress={() => this.deletePhoto()} />
                        <Button title='EDIT' onPress={() => this.props.edit(this.props.id)} />
                        <Text>Checkbox to compare</Text>
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
        onPhotoEdit: (token, storyId, photo) => dispatch(updatePhoto(token, storyId, photo.id, photo))
    }
};

export default connect (mapStateToProps, mapDispatchToProps) (PhotoListItem);