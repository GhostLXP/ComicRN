/**
 * Created by yuewen on 2017/9/6.
 漫画信息
 */

import React, { PureComponent } from 'react'
import {StyleSheet, Image, Text, View ,TouchableHighlight} from 'react-native'
import screen from '../../common/screen'
import {getCoverUrlByBid} from '../../common/tools'
import Color from '../../common/color'
import ComicCellSeparatorComponent from '../../widget/component/ComicCellSeparatorComponent'

export default class ComicOriginalBookCell extends PureComponent {

    render() {

        let item = this.props.item
        console.log('ComicOriginalBookCell',item)
        return(
        <View>
            <View style = {styles.titleContainer}>
            	<Text style = {styles.title}>
            		{item.title}
            	</Text>
            	<Text style = {styles.subtitle}>
            		{item.subTitle}
            	</Text>
            </View>
            <TouchableHighlight  onPress={()=> this.onPressButton()} activeOpacity ={0.5} underlayColor={"#e3e4e5"} >
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginLeft:15,
                marginRight:15,
            }}>
                <Image source={{ uri : getCoverUrlByBid(item.data.bid)}} style={styles.cover}>
                </Image>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginLeft: 12,
                    height: 91,
                }}>
                    <Text 
                        style={styles.name}
                        numberOfLines ={1}
                        ellipsizeMode='tail'
                    >
                        {item.data.title}
                    </Text>
                    <Text 
                        style={styles.content}
                        numberOfLines ={2}
                        ellipsizeMode='tail'
                    >
                        {item.data.intro}
                    </Text>
                    <View
                        style={{flexDirection: 'row',
                              marginTop: 6,
                              justifyContent:"flex-start",
                              alignItems: 'center',}}
                    >
                        <Image style={{width:12,height:12}} source={require('../../images/card_author_icon.png')}></Image>
                        <Text
                            style={styles.author}
                            numberOfLines ={1}
                        >
                            {item.data.author}
                        </Text>
                    </View>
                </View>
            </View>
            </TouchableHighlight>
            <ComicCellSeparatorComponent/>
        </View>
            )

    }
    onPressButton(){
        console.log("漫画原著")
    }
}

// define your styles
const styles = StyleSheet.create({
    name:{
        backgroundColor:'transparent',
        color:Color.text_color_c101,
        fontSize:14,
    },
    content:{
        backgroundColor:'transparent',
        color:Color.text_color_c103,
        fontSize:12,
        lineHeight:24,
    },
    author:{
        backgroundColor:'transparent',
        color:Color.text_color_c103,
        fontSize:12,
        marginLeft:6
    },
    cover:{
        marginBottom:12,
        width:68,
        height:91,
    },
    titleContainer: {
    	flex: 1,
    	flexDirection: 'row',
    	marginLeft: 15,
    	marginRight: 15,
    	marginTop:12,
    	marginBottom:12,
    	alignItems: 'flex-end',
    	},
    title: {
        fontSize: 18,
        color: Color.text_color_c401,
        },
    subtitle: {
        fontSize: 12,
        color: Color.text_color_c401,
        marginLeft:6,
        },
})