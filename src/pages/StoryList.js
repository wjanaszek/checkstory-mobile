import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

class StoryList extends Component {
    render() {
        return (
            <View>
                <Text>StoryList</Text>
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        error: state.auth.error
    };
};

export default connect (mapStateToProps) (StoryList);