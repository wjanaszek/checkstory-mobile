import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, FlatList, ScrollView } from 'react-native';
import { getAllStories } from '../../redux/actions/stories';
import { List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { getAllPhotos } from '../../redux/actions/photos';

class StoryList extends Component {
    loadStories() {
        this.props.onStoriesLoad(this.props.token);
    }

    render() {
        return (
            <ScrollView>
                {this.props.loading ?
                    (<Text>Loading...</Text>) :
                    (<List>
                        <FlatList
                            data={this.props.stories}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
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
                <Button onPress={() => Actions.storyAdd()} title='Add story'/>
                <View style={{marginTop: 10}}>
                    <Button onPress={() => Actions.popup({
                        title: 'Logout',
                        message: 'Are you sure you want to logout?',
                        yesOptionMsg: 'YES',
                        noOptionMsg: 'NO'
                    })} title='Logout'/>
                </View>
            </ScrollView>
        )
    }
}

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

export default connect (mapStateToProps, mapDispatchToProps) (StoryList);