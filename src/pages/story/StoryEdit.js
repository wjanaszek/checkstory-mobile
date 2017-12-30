import React, { Component } from 'react';
import { Button, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, View } from 'react-native';
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
            titleError: false,
            notes: this.props.story.notes,
            longitude: this.props.story.longitude,
            longitudeError: false,
            latitude: this.props.story.latitude,
            latitudeError: false,
            createDate: this.props.story.createDate,
            createDateError: false
        }
    }

    updateStory() {
        this.props.onStoryEdit(this.props.token, this.state, this.state.id);
    }

    render() {
        return(
            <ScrollView style={{padding: 20}}>
                <Text style={styles.labelStyle}>Title</Text>
                <TextInput
                    placeholder='Title'
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={true}
                    keyboardType='email-address'
                    value={this.state.title}
                    onChangeText={(text) => this.setState({ title: text })}
                    onEndEditing={() => {
                        if (!this.state.title) {
                            this.setState({ titleError: true });
                        } else {
                            this.setState({ titleError: false });
                        }
                    }}
                />
                { this.state.titleError ? (<Text style={{color: 'red'}}>This field is required</Text>) : null }
                <Text style={styles.labelStyle}>Notes</Text>
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
                <Text style={styles.labelStyle}>Longitude</Text>
                <TextInput
                    placeholder='Longitude'
                    autoCapitalize='none'
                    autoCorrect={true}
                    autoFocus={false}
                    keyboardType='email-address'
                    value={`${this.state.longitude}`}
                    onChangeText={(text) => this.setState({ longitude: text })}
                    onEndEditing={() => {
                        if (!this.state.longitude || !this.state.longitude.isNumber) {
                            this.setState({ longitudeError: true });
                        } else {
                            this.setState({ longitudeError: false });
                        }
                    }}
                />
                { this.state.longitudeError ? (<Text style={{color: 'red'}}>This field is required and has to be a number</Text>) : null }
                <Text style={styles.labelStyle}>Latitude</Text>
                <TextInput
                    placeholder='Latitude'
                    autoCapitalize='none'
                    autoCorrect={true}
                    autoFocus={false}
                    keyboardType='email-address'
                    value={`${this.state.latitude}`}
                    onChangeText={(text) => this.setState({ latitude: text })}
                    onEndEditing={() => {
                        if (!this.state.latitude || !this.state.latitude.isNumber) {
                            this.setState({ latitudeError: true });
                        } else {
                            this.setState({ latitudeError: false });
                        }
                    }}
                />
                { this.state.latitudeError ? (<Text style={{color: 'red'}}>This field is required and has to be a number</Text>) : null }
                <Text style={styles.labelStyle}>Create date</Text>
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
                            this.setState({ createDateError: true });
                        } else {
                            this.setState({ createDateError: false });
                        }
                    }}
                />
                { this.state.createDateError ? (<Text style={{color: 'red'}}>This field is required</Text>) : null }
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={{marginRight: 20, marginTop: 10}}>
                        <Button title='CANCEL' onPress={() => Actions.pop()} />
                    </View>
                    {!this.props.loading ?
                        (<View style={{marginLeft: 10, marginTop: 10}}>
                            <Button title='SAVE' onPress={() => this.updateStory()} />
                        </View>) :
                        (<View style={{marginLeft: 10, marginTop: 10}}>
                            <TouchableOpacity disabled={true}>
                                <Text>Updating story...</Text>
                            </TouchableOpacity>
                        </View>)}
                </View>
                { this.props.error ? (<Text style={{color: 'red'}}>{this.props.error}</Text>) : null }
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

const styles = StyleSheet.create({
    labelStyle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 2
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        onStoryEdit: (token, story, storyId) => dispatch(updateStory(token, story, storyId)),
        onStoryDelete: (token, storyId) => dispatch(deleteStory(token, storyId)),
        onPhotoAdd: (token, storyId, photo) => dispatch(createPhoto(token, storyId, photo))
    }
};

export default connect (mapStateToProps, mapDispatchToProps) (StoryEdit);