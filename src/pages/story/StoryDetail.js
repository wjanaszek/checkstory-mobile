import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

class StoryDetail extends Component {
    render() {
        return (
            <View>
                <Text>StoryDetail {this.props.story.id}</Text>
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        error: state.auth.error
    };
};

export default connect (mapStateToProps) (StoryDetail);