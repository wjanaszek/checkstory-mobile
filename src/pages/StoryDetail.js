import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';

class StoryDetail extends Component {
    render() {
        return (
            <View>
                <Text>StoryDetail</Text>
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