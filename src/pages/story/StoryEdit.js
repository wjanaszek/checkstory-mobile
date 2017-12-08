import React, { Component } from 'react';
import { Button, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { deleteStory, updateStory } from '../../redux/actions/stories';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import { createPhoto } from '../../redux/actions/photos';

class StoryEdit extends Component {
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

    updateStory() {
        console.log(JSON.stringify(this.state));
        this.props.onStoryEdit(this.props.token, this.state, this.state.id);
    }

    render() {
        return(
            <ScrollView style={{padding: 20}}>
                <TextInput
                    placeholder='Title'
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={true}
                    keyboardType='email-address'
                    value={this.state.title}
                    onChangeText={(text) => this.setState({ title: text })}
                />
                <TextInput
                    placeholder='Notes'
                    autoCapitalize='none'
                    autoCorrect={true}
                    autoFocus={false}
                    keyboardType='email-address'
                    multiline={true}
                    numberOfLines={4}
                    value={this.state.notes}
                    onChangeText={(text) => this.setState({ notes: text })}
                />
                <TextInput
                    placeholder='Longitude'
                    autoCapitalize='none'
                    autoCorrect={true}
                    autoFocus={false}
                    keyboardType='email-address'
                    value={`${this.state.longitude}`}
                    onChangeText={(text) => this.setState({ longitude: text })}
                />
                <TextInput
                    placeholder='Latitude'
                    autoCapitalize='none'
                    autoCorrect={true}
                    autoFocus={false}
                    keyboardType='email-address'
                    value={`${this.state.latitude}`}
                    onChangeText={(text) => this.setState({ latitude: text })}
                />
                <DatePicker
                    date={this.state.createDate}
                    mode='date'
                    placeholder='Select create date'
                    format='YYYY-MM-DD'
                    confirmBtnText='Confirm'
                    cancelBtnText='Cancel'
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(date) => {this.setState({ createDate: date })}}
                />
                <Button title='CANCEL' onPress={() => Actions.pop()} />
                {!this.props.loading ?
                    (<Button title='SAVE' onPress={() => this.updateStory()} />) :
                    (<TouchableOpacity disabled={true}>
                        <Text>Updating story...</Text>
                    </TouchableOpacity>)}
                {this.props.error ? (<Text style={{color: 'red'}}>{this.props.error}</Text>) : null}
            </ScrollView>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        error: state.auth.error,
        token: state.auth.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStoryEdit: (token, story, storyId) => dispatch(updateStory(token, story, storyId)),
        onStoryDelete: (token, storyId) => dispatch(deleteStory(token, storyId)),
        onPhotoAdd: (token, storyId, photo) => dispatch(createPhoto(token, storyId, photo))
    }
};

export default connect (mapStateToProps, mapDispatchToProps) (StoryEdit);