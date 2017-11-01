/**
 * Created by yuewen on 2017/9/6.
 漫画信息
 */

import React, { PureComponent } from 'react'
import {StyleSheet, Image, Text, View } from 'react-native'
import screen from '../../common/screen'
import {getComicCoverUrlByBid} from '../../common/tools'
import Color from '../../common/color'

export default class ComicInfoCell extends PureComponent {

    render() {

        let item = this.props.item
        console.log('ComicInfoCell',item)

        if (item.headUrl) {
            return(
            <View style={styles.container}>
                <Image source={{ uri : item.headUrl}} style={styles.image}>
                    <Image source={require('../../images/coverMask.png')}
                           style={styles.mask}>
                        <Text style = {styles.name}
                              numberOfLines ={1}
                              ellipsizeMode='tail'>
                            {item.title}
                        </Text>
                        <Text numberOfLines ={1}
                              style = {styles.author}>
                            {item.author}
                        </Text>
                        <Text numberOfLines ={1}
                              style = {styles.price}>
                            {item.guide.desc + item.priceDesc}
                        </Text>
                        <Text numberOfLines ={1}
                              style = {styles.guide}>
                            {item.guide.desc}
                        </Text>
                    </Image>
                </Image>
            </View>
            )
        }else {
            return(
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
            }}>
                <Image source={{ uri : getComicCoverUrlByBid(item.cid)}} style={styles.cover}>
                </Image>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginLeft: 16,
                    marginTop: 30,
                    height: 72,
                }}>
                    <Text 
                        style={styles.name1}
                        numberOfLines ={1}
                        ellipsizeMode='tail'
                    >
                        {item.title}
                    </Text>
                    <Text 
                        style={styles.author1}
                        numberOfLines ={1}
                    >
                        {item.author}
                    </Text>
                    <Text
                        style={styles.price1}
                        numberOfLines ={1}
                    >
                        {item.priceDesc}
                    </Text>
                    <Text
                         style={styles.guide1}
                         numberOfLines ={1}
                    >
                         {item.guide.desc}
                    </Text>
                </View>
            </View>
            )
        }
    }
}

// define your styles
const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
    },

    image: {
        marginTop: 0,
        marginLeft: 0,
        width: screen.width,
        height: 160,
    },

    mask: {
        marginTop: 0,
        marginLeft: 0,
        width: screen.width,
        height: 160,
    },

    name: {
              backgroundColor: 'transparent',
              color: Color.text_color_c104,
              fontSize: 16,
              marginTop:60,
              marginLeft:15
          },
    name1: {
        backgroundColor: 'transparent',
        color: Color.text_color_c101,
        fontSize: 16,
    },
    author: {
        backgroundColor: 'transparent',
        color: Color.text_color_c104,
        fontSize: 12,
        marginLeft:15,
        marginTop:5
    },
    author1: {
        backgroundColor: 'transparent',
        color: Color.text_color_c103,
        fontSize: 12,
        marginTop:5
    },
    authorCover: {
        backgroundColor: 'transparent',
        color: Color.text_color_c104,
        fontSize: 12,
        marginLeft:20,
        marginTop:15
    },

    price: {
         backgroundColor: 'transparent',
         color: Color.text_color_c104,
         fontSize: 12,
         marginLeft:15,
         marginTop:5
          },
    price1: {
          backgroundColor: 'transparent',
          color: Color.text_color_c103,
          fontSize: 12,
          marginTop:5
          },
    guide: {
        backgroundColor: 'transparent',
        color: Color.text_color_c701,
        fontSize: 12,
        marginLeft:15,
        marginTop:5,
    },
    guide1: {
         backgroundColor: 'transparent',
         color: Color.text_color_c701,
         fontSize: 12,
         marginTop:5,
        },
    cover: {
        marginLeft: 15,
        marginBottom: 0,
        marginTop: 30,
        width: 84,
        height: 113
    },
})