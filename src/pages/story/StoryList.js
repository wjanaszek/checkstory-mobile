import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getAllStories } from '../../redux/actions/stories';
import { List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { getAllPhotos } from '../../redux/actions/photos';
import ActionButton from 'react-native-action-button';
import { initialRegion } from '../App';

class StoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: initialRegion
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{padding: 10}}>
                    {this.props.loading ?
                        (<Text>Loading...</Text>) :
                        (<List>
                            <FlatList
                                data={this.props.stories}
                                keyExtractor={item => item.id}
                                renderItem={({item}) => (
                                    <ListItem
                                        title={`${item.title}`}
                                        subtitle={item.createDate}
                                        onPress={() => {
                                            Actions.storyDetail({story: item});
                                            this.props.onStoryPreview(this.props.token, item.id);
                                        }}
                                    />
                                )}
                            />
                        </List>)}
                </ScrollView>
                <ActionButton buttonColor='rgba(231,76,60,1)' title='Add story' onPress={() => Actions.storyAdd()}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white'
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        loading: state.stories.loading,
        stories: state.stories.stories,
        error: state.auth.error,
        token: state.auth.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStoriesLoad: (token) => dispatch(getAllStories(token)),
        onStoryPreview: (token, storyId) => dispatch(getAllPhotos(token, storyId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryList);