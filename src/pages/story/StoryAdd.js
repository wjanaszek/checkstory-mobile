import React, { Component } from 'react';
import { Button, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { createStory } from '../../redux/actions/stories';
import Story from '../../model/Story';
import DatePicker from 'react-native-datepicker';

class StoryAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            titleError: false,
            notes: '',
            longitude: '',
            longitudeError: false,
            latitude: '',
            latitudeError: false,
            createDate: '',
            createDateError: false
        }
    }

    addStory() {
        if (this.state.titleError || this.state.longitudeError || this.state.latitudeError || this.state.createDateError) return;
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
                    onEndEditing={() => {
                        if (!this.state.title || !this.state.title.isNumber) {
                            this.state.titleError = true;
                        } else {
                            this.state.titleError = false;
                        }
                        console.log('title error ' + this.state.titleError);
                    }}
                />
                {this.state.titleError ? (<Text style={{color: 'red'}}>This field is required</Text>) : null }
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
                    onEndEditing={() => {
                        if (!this.state.longitude || !this.state.longitude.isNumber) {
                            this.state.longitudeError = true;
                        } else {
                            this.state.longitudeError = false;
                        }
                    }}
                />
                {this.state.longitudeError ? (<Text style={{color: 'red'}}>This field is required and has to be a number</Text>) : null }
                <TextInput
                    placeholder='Latitude'
                    autoCapitalize='none'
                    autoCorrect={true}
                    autoFocus={false}
                    keyboardType='email-address'
                    value={this.state.latitude}
                    onChangeText={(text) => this.setState({ latitude: text })}
                    onEndEditing={() => {
                        if (!this.state.latitude || !this.state.latitude.isNumber) {
                            this.state.latitudeError = true;
                        } else {
                            this.state.latitudeError = false;
                        }
                    }}
                />
                {this.state.latitudeError ? (<Text style={{color: 'red'}}>This field is required and has to be a number</Text>) : null }
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
                    onCloseModal={() => {
                        if (!this.state.createDate) {
                            this.state.createDateError = true;
                        } else {
                            this.state.createDateError = false;
                        }
                    }}
                />
                {this.state.createDateError ? (<Text style={{color: 'red'}}>This field is required</Text>) : null }
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