import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from './BaseModalBlack';
import Icon from 'react-native-vector-icons/Ionicons';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

class ImagePreviewModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal hideClose>
                <View>
                    <TouchableOpacity onPress={() => Actions.pop()} style={{zIndex: 1000, width: 75, height: 25, borderColor: 'white', borderWidth: 1, borderRadius: 10}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                            <View>
                                <Icon name='md-arrow-round-back' style={styles.actionButtonIcon}/>
                            </View>
                            <View>
                                <Text style={{fontSize: 16, color: 'white', marginLeft: 10}}>
                                    BACK
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.popup}>
                    <Image
                        style={{width: deviceWidth, height: deviceHeight, resizeMode: Image.resizeMode.contain, borderRadius: 5, marginBottom: 5}}
                        source={{uri: `data:image/${this.props.imageType};base64,${this.props.content}`}} />
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    popup: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white'
    }
});

export default ImagePreviewModal;