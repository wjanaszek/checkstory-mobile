import React, { Component } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { createStory } from '../../redux/actions/stories';
import Story from '../../model/Story';
import DatePicker from 'react-native-datepicker';
import { initialRegion } from '../App';
const MapView = require('react-native-maps');

class StoryAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            titleError: false,
            notes: '',
            createDate: '',
            createDateError: false,
            region: {
                latitude: initialRegion.latitude,
                longitude: initialRegion.longitude,
                latitudeDelta: initialRegion.latitudeDelta,
                longitudeDelta: initialRegion.longitudeDelta
            },
            marker: {
                latitude: initialRegion.latitude,
                longitude: initialRegion.longitude
            }
        };

        this.onRegionChange = this.onRegionChange.bind(this);
    }

    addStory() {
        if (!this.formValid()) {
            return;
        }
        this.props.onStoryAdd(
            this.props.token,
            this.state.title,
            this.state.notes,
            this.state.marker.latitude,
            this.state.marker.longitude,
            this.state.createDate
        );
    }

    formValid() {
        if (!this.state.title || !this.state.createDate) {
            return false;
        } else {
            return true;
        }
    }

    // debug purpose only
    onRegionChange(region) {
    }

    render() {
        return(
            <ScrollView style={{padding: 20}}>
                <Text style={styles.labelStyle}>
                    Title
                </Text>
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={true}
                    returnKeyType='next'
                    keyboardType='email-address'
                    value={this.state.title}
                    onSubmitEditing={() => this.refs.notes.focus()}
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
                <Text style={styles.labelStyle}>
                    Notes
                </Text>
                <TextInput
                    ref='notes'
                    autoCapitalize='none'
                    autoCorrect={true}
                    autoFocus={false}
                    keyboardType='email-address'
                    multiline={true}
                    returnKeyType='next'
                    numberOfLines={4}
                    value={this.state.notes}
                    onChangeText={(text) => this.setState({ notes: text })}
                />
                <Text style={styles.labelStyle}>
                    Location
                </Text>
                <View style={{
                    borderRadius: 5,
                    height: 250,
                    width: 400,
                    justifyContent: 'flex-end',
                    alignItems: 'center',}}>
                    <MapView
                        style={{...StyleSheet.absoluteFillObject}}
                        region={this.state.region}
                        onRegionChange={this.onRegionChange}>
                        <MapView.Marker draggable
                                        coordinate={this.state.marker}
                                        onDragEnd={(e) => this.setState({ marker: e.nativeEvent.coordinate })}/>
                    </MapView>
                </View>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginTop: 7
                }}>
                    Create date
                </Text>
                <View style={{marginTop: 10, marginBottom: 10}}>
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
                </View>
                { this.state.createDateError ? (<Text style={{color: 'red'}}>This field is required</Text>) : null }
                { !this.props.loading ?
                    (<Button onPress={() => this.addStory()} title='ADD STORY'/>) :
                    (<TouchableOpacity disabled={true}>
                        <Text>Adding story...</Text>
                    </TouchableOpacity>)}
                { this.props.error ? (<Text style={{color: 'red'}}>{this.props.error}</Text>) : null }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
   labelStyle: {
       fontWeight: 'bold',
       fontSize: 18,
       marginTop: 7,
       marginBottom: 7
   }
});

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