import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class Home extends Component {
    componentDidMount() {
        if (this.props.isLoggedIn) {
            Actions.reset('storyList');
        } else {
            Actions.login();
        }
    }

    render() {
        return(
            <View>
                <Text>Home</Text>
                <View style={styles.rowButtons}>
                    <Button style={styles.button} title='Log in' onPress={() => Actions.login()}/>
                    <Button style={styles.button} title='Sign up' onPress={() => Actions.register()}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    button: {
        width: '50%',
        marginTop: '13',
        marginBottom: '13'
    },
    rowButtons: {
        flexDirection: 'row'
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,       // TODO uncheck this to state.auth.isLoggedIn
        loading: state.auth.loading,
        error: state.auth.error
    };
};

export default connect(mapStateToProps) (Home);