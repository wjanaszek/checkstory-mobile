import React, { Component } from 'react';
import { Button, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { createStory } from '../../redux/actions/stories';
import Story from '../../model/story';
import DatePicker from 'react-native-datepicker';

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
        console.log(JSON.stringify(this.state));
        console.log('token: ' + this.props.token);
        this.props.onStoryAdd(this.props.token, this.state.title, this.state.notes, this.state.longitude, this.state.latitude, this.state.createDate);
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
                    onDateChange={(date) => {this.setState({createDate: date})}}
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