/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {
    PureComponent
} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    InteractionManager,
    ActivityIndicator,
} from 'react-native';

import Image from 'react-native-image-progress';
import Color from '../../common/color'
let {
    width,
    height
} = Dimensions.get('window');

export default class TitleView extends PureComponent {
    static defaultProps = {
        pictureData: React.PropTypes.string,
        picturePress: null,
    };

    constructor(props) {
        super(props);
        let imageHeight = 100;
        this.state = {
            imageHeight: imageHeight,
        };
    }

    renderPicture() {
        return (
            <View style = {{flexDirection:'row',alignItems:'flex-end',paddingLeft:16,paddingRight:16}} >
                    <View style = { { flex:1, backgroundColor : '#ffffff'}}>
                        <View style = {{flexDirection:'row',alignItems:'flex-end',justifyContent:'flex-start'}}>
                            <Text style = {{fontSize:18,color:Color.text_color_c101,fontWeight:'bold',marginTop:12}}>
                                {this.props.pictureData.title}
                            </Text>
                            <Text style = {{fontSize:12,color:Color.text_color_c101,fontWeight:'bold',paddingBottom:2}}>
                            {this.props.pictureData.subTitle}
                            </Text>
                        </View>

                        <Text style = {{fontSize:12,color:Color.text_color_c103,marginTop:4}}>
                            {this.props.pictureData.pushName}
                        </Text>
                    </View>
                    <Image  style={{width: 42, height: 42}}
                    source={{uri:this.props.pictureData.columnIcon}}
                    />
                </View>

        )
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.picturePress} activeOpacity={0.9} >
                    {this.renderPicture()}
            </TouchableOpacity>
        )

    }
}