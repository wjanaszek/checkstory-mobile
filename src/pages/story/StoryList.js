import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SectionList, Text, View, Button, FlatList } from 'react-native';
import { getAllStories } from '../../redux/actions/stories';
import { List, ListItem, SearchBar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

class StoryList extends Component {
    loadStories() {
        this.props.onStoriesLoad(this.props.token);
    }

    render() {
        return (
            <View>
                {this.props.loading ?
                    (<Text>Loading...</Text>) :
                    (<List>
                        <FlatList
                            data={this.props.stories}
                            renderItem={({ item }) => (
                                <ListItem
                                    title={`${item.title}`}
                                    subtitle={item.createDate}
                                    onPress={() => Actions.storyDetail({id: item.id})}
                                />
                            )}
                        />
                    </List>
                    )}
                <Button onPress={() => Actions.storyAdd()} title='Add story'/>
            </View>
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
        onStoriesLoad: (token) => dispatch(getAllStories(token))
    };
};

export default connect (mapStateToProps, mapDispatchToProps) (StoryList);