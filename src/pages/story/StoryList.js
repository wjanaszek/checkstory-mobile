import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList, ScrollView, StyleSheet } from 'react-native';
import { getAllStories } from '../../redux/actions/stories';
import { List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { getAllPhotos } from '../../redux/actions/photos';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { initialRegion } from '../App';

var MapView = require('react-native-maps');

class StoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: initialRegion
        }
    }

    // @TODO to remove?
    loadStories() {
        this.props.onStoriesLoad(this.props.token);
    }

    onRegionChange(region) {
        this.setState({ region: region });
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
                {/*<Text>before</Text>*/}
                {/*<View style={{*/}
                    {/*height: 400,*/}
                    {/*width: 400,*/}
                    {/*justifyContent: 'flex-end',*/}
                    {/*alignItems: 'center',}}>*/}
                    {/*<MapView style={{...StyleSheet.absoluteFillObject}} region={this.state.region} onRegionChange={this.onRegionChange}/>*/}
                {/*</View>*/}
                {/*<Text>after</Text>*/}
                <View style={{height: 500}}>
                    <ActionButton buttonColor='rgba(231,76,60,1)'>
                        <ActionButton.Item buttonColor='#8342f4' title='Add story' onPress={() => Actions.storyAdd()}>
                            <Icon name='md-create' style={styles.actionButtonIcon}/>
                        </ActionButton.Item>
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