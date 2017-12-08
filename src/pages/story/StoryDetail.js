import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TouchableOpacity, ScrollView, Text, StyleSheet } from 'react-native';
import { deleteStory } from '../../redux/actions/stories';
import { createPhoto } from '../../redux/actions/photos';
import { Actions } from 'react-native-router-flux';

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

    deleteStory() {
    }

    addPhoto() {
    }

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <Button onPress={() => Actions.storyEdit({ story: this.state })} title='EDIT' />
                <Button onPress={() => this.deleteStory()} title='DELETE' />
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
                    (<Button onPress={() => this.addPhoto()} title='ADD PHOTOS'/>) :
                    (<TouchableOpacity disabled={true}>
                        <Text>Adding photo...</Text>
                    </TouchableOpacity>)}
                {this.props.error ? (<Text style={{color: 'red'}}>{this.props.error}</Text>) : null}
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
        loading: state.stories.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStoryDelete: (token, storyId) => dispatch(deleteStory(token, storyId)),
        onPhotoAdd: (token, storyId, photo) => dispatch(createPhoto(token, storyId, photo))
    }
};

export default connect (mapStateToProps, mapDispatchToProps) (StoryDetail);