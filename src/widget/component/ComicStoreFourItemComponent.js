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
    TouchableHighlight,
    InteractionManager,
    ActivityIndicator,
} from 'react-native';

import Image from 'react-native-image-progress';
import Color from '../../common/color'
import ItemForFourItemCommponent from './ItemForFourItemCommponent';
import { logger } from 'react-native-logger'

export default class ComicStoreFourItemCard extends PureComponent {
    static defaultProps = {
        cardData: React.PropTypes.string,
        picturePress: null,
    };

    constructor(props) {
        super(props);
        let imageHeight = 100;
        this.state = {
            imageHeight: imageHeight,
        };
    }


    componentDidMount(){
        logger.log('WxPerformace componentDidMount')
    }

    render() {

        return (

            <View style = {{flexDirection:'column'}}>
                
                <View style={styles.container}>
                 {this.props.cardData.bookList.map((info, index) => (
                    <ItemForFourItemCommponent
                        info={info}
                        key={index}
                        onPress={() => this.props.entrancePress(index)}
                        navigation = {this.props.navigation} />
                ))}
            
                </View>
                 <View style={{flex:1,height:0.5,backgroundColor:'#f2f2f2',marginTop:12}}></View>
                <TouchableHighlight
                    style={{backgroundColor:'#ffffff'}}
                    underlayColor={'#f2f2f2'} 
                    onPress={() => this.props.morePress(this.props.cardData.cid)}
                    >
                    <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',height:50}}>
                        <Text>
                            更多戳这里
                        </Text>
                        <Image style={{height:12,width:9}}
                        source={require('../../images/icon_star_click_more.png')}/>
                    </View>
                </TouchableHighlight>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingLeft: 8,
        paddingRight: 8,
    },
});