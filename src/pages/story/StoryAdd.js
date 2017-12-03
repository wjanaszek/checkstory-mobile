import React, { Component } from 'react';
import { Button, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { createStory } from '../../redux/actions/stories';
import Story from '../../model/story';

class StoryAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            notes: '',
            longitude: '',
            latitude: '',
            createDate: ''
        }
    }

    addStory() {
        this.props.onStoryAdd();
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
                    value={this.state.notes}
                    onChangeText={(text) => this.setState({ notes: text })}
                />
                <TextInput
                    placeholder='Longitude'
                    autoCapitalize='none'
                    autoCorrect={true}
                    autoFocus={false}
                    keyboardType='email-address'
                    value={this.state.longitude}
                    onChangeText={(text) => this.setState({ longitude: text })}
                />
                <TextInput
                    placeholder='Latitude'
                    autoCapitalize='none'
                    autoCorrect={true}
                    autoFocus={false}
                    keyboardType='email-address'
                    value={this.state.latitude}
                    onChangeText={(text) => this.setState({ latitude: text })}
                />
                <TextInput
                    placeholder='Create date'
                    autoCapitalize='none'
                    autoCorrect={true}
                    autoFocus={false}
                    keyboardType='email-address'
                    value={this.state.createDate}
                    onChangeText={(text) => this.setState({ createDate: text })}
                />
                {!this.props.loading ?
                    (<Button onPress={() => this.addStory()} title='ADD STORY'/>) :
                    (<TouchableOpacity disabled={true}>
                        <Text>Adding story...</Text>
                    </TouchableOpacity>)}
                {this.props.error ? (<Text style={{color: 'red'}}>{this.props.error}</Text>) : null}
            </ScrollView>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStoryAdd: (token, title, notes, longitude, latitude, createDate) => dispatch(createStory(token, new Story(title, notes, longitude, latitude, createDate)))
    }
};

export default connect (mapStateToProps, mapDispatchToProps) (StoryAdd);