import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

const { height: deviceHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

class Popup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offset: new Animated.Value(-deviceHeight)
        };
    }

    componentDidMount() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: 0
        }).start();
    }

    closeModal() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: -deviceHeight
        }).start(Actions.pop);
    }

    render() {
        return (
            <Animated.View style={[styles.container, {backgroundColor: 'rgba(52,52,52,0.5)'},
                {transform: [{translateY: this.state.offset}]}]}>
                <View style={{
                    width: 250,
                    height: 250,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white'
                }}>
                    <Text>{this.props.data}</Text>
                    <Button onPress={this.closeModal.bind(this)} title='CLOSE'/>
                </View>
            </Animated.View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,       // TODO uncheck this to state.auth.isLoggedIn
        loading: state.auth.loading,
        error: state.auth.error
    };
};

export default connect(mapStateToProps) (Popup);