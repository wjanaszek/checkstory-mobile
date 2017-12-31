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

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

class ImagePreviewModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal hideClose>
                <View>
                    <TouchableOpacity onPress={() => Actions.pop()} style={{borderColor: 'white', borderRadius: 15}}>
                        <Text style={{color: 'white'}}>
                            BACK
                        </Text>
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
    }
});

export default ImagePreviewModal;