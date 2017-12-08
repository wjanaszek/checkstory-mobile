import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TouchableOpacity, ScrollView, Text, StyleSheet, View, FlatList, Image } from 'react-native';
import { createPhoto } from '../../redux/actions/photos';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';
import PhotoListItem from './PhotoListItem';

class StoryDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.story.id,
            title: this.props.story.title,
            notes: this.props.story.notes,
            longitude: this.props.story.longitude,
            latitude: this.props.story.latitude,
            createDate: this.props.story.createDate
        }
    }

    addPhoto() {
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
                    (<Button title='ADD PHOTOS' onPress={() => this.addPhoto()} style={{marginTop: 10}}/>) :
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