import React, { Component } from 'react';
import { Button, Image, Text, View } from 'react-native';

class PhotoListItem extends Component {
    render() {
        return(
            <View style={{borderBottomWidth: 1, borderColor: 'black', marginTop: 5}}>
                <View>
                    <Image
                        style={{width: 300, height: 150, resizeMode: Image.resizeMode.contain, borderRadius: 5, marginBottom: 5}}
                        source={{uri: `data:image/${this.props.imageType};base64,${this.props.content}`}} />
                </View>
                <View style={{marginLeft: 5}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'left'}}>Date</Text>
                    <Text style={{flex: 1, fontSize: 16, textAlign: 'left'}}>{this.props.createDate}</Text>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', flexDirection: 'row'}}>
                        <Button title='DELETE' onPress={() => console.log('delete photo')} />
                        <Button title='EDIT' onPress={() => console.log('edit photo')} />
                        <Text>Checkbox to compare</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default PhotoListItem;