import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, FlatList, ScrollView, StyleSheet } from 'react-native';
import { getAllStories } from '../../redux/actions/stories';
import { List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { getAllPhotos } from '../../redux/actions/photos';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

class StoryList extends Component {
    loadStories() {
        this.props.onStoriesLoad(this.props.token);
    }

    render() {
        return (
            <ScrollView style={{flex: 1, padding: 10}}>
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
                <View style={{height: 500}}>
                    <ActionButton buttonColor='rgba(231,76,60,1)'>
                        <ActionButton.Item buttonColor='#8342f4' title='Add story' onPress={() => Actions.storyAdd()}>
                            <Icon name='md-create' style={styles.actionButtonIcon}/>
                        </ActionButton.Item>
                        // @TODO remove this
                        {/*<ActionButton.Item buttonColor='#f49d41' title='Logout' onPress={() => Actions.popup({*/}
                                {/*title: 'Logout',*/}
                                {/*message: 'Are you sure you want to logout?',*/}
                                {/*yesOptionMsg: 'LOGOUT',*/}
                                {/*noOptionMsg: 'Cancel'*/}
                            {/*})}>*/}
                            {/*<Icon name='md-backspace' style={styles.actionButtonIcon}/>*/}
                        {/*</ActionButton.Item>*/}
                    </ActionButton>
                </View>
            </ScrollView>
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

export default connect (mapStateToProps, mapDispatchToProps) (StoryList);