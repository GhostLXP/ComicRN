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
    Image,
    Dimensions,
    TouchableOpacity,
    InteractionManager,
    TouchableHighlight,
    ActivityIndicator,
} from 'react-native';

import Color from '../../common/color'
import {
    screen,
    dimmension,
    colorInner
} from '../../common'
import {
    getComicCoverUrlByBid
} from '../../common/tools';
export default class TitleView extends PureComponent {
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

    renderPicture() {
        let adv = this.props.cardData.adList[0]
        let imageUrl = adv.imageUrl
        let bookImageurl = adv.extInfo.extImage
        let comicUrl = adv.comicInfo.comicId
        let adDesc = adv.descr
        if (comicUrl != null) {
            comicUrl = getComicCoverUrlByBid(comicUrl, 88, 116)
        }
        let bookName
        let bookReadNumDes
        let bookIntro
        if (adv.bookInfo != null) {
            bookName = adv.bookInfo.bookTitle
            bookReadNumDes = adv.bookInfo.bookReadTimesDesc
            bookIntro = adv.bookInfo.bookIntro
        }
        if (adv.bookInfo != null) {
            return (
            <View style = {{flexDirection:'column',marginLeft:16,marginRight:16, paddingBottom:14}} >
                <View  style={{ height: 220}}>
                    <Image style={{height: 50}} source={{uri:imageUrl}} />

                     <View style = {styles.topImageStyle} >
                            <Image style={styles.bgImageStyle} source={{uri:bookImageurl}} />

                             <View style = {{flexDirection:'row', alignItems:'flex-end', marginTop: -68}}>
                                <Image style={styles.comicImageStyle} source={{uri:comicUrl}} />
                                <Image resizeMode = {Image.resizeMode.contain} style={styles.adDialogStyle} source={require('../../images/comic_card_dialog_bg.png')}> 
                                        <Text style={styles.adTextStyle}>{adDesc}</Text>
                                </Image>
                             </View>

                     </View>
                </View>

                <View  >
                        <View  style = {{flexDirection:'row', justifyContent:'space-between'}}>
                            <Text numberOfLines={1} style={styles.nameStyle}>{bookName}</Text>
                            <Text numberOfLines={1} style={styles.redNumStyle}>{bookReadNumDes}</Text>
                         </View>
                        
                        <Text numberOfLines={2} style={styles.introStyle}>{bookIntro}</Text>
                </View>
                    
            </View>

        )
        } else {
            return (
                 <TouchableOpacity
                        onPress={() => {this.onBookClicked(adv.comicInfo.comicId)}}>
                    
                    <View style = {{flexDirection:'column',marginLeft:16,marginRight:16, paddingBottom:14}} >
                        <View  style={{ height: 220}}>
                            <Image style={{height: 50}} source={{uri:imageUrl}} />

                             <View style = {styles.topImageStyle} >
                                    <Image style={styles.bgImageStyle} source={{uri:bookImageurl}} />

                                     <View style = {{flexDirection:'row', alignItems:'flex-end', marginTop: -68}}>
                                        <Image style={styles.comicImageStyle} source={{uri:comicUrl}} />
                                        <Image resizeMode = {Image.resizeMode.contain} style={styles.adDialogStyle} source={require('../../images/comic_card_dialog_bg.png')}> 
                                                <Text style={styles.adTextStyle}>{adDesc}</Text>
                                        </Image>
                                     </View>

                             </View>
                        </View>
                    </View>
                </TouchableOpacity>)
        }
        
    }

    onBookClicked(comicId) {
        console.log('click book, comicId: ' + comicId)
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.picturePress} activeOpacity={0.9} >
                    {this.renderPicture()}
            </TouchableOpacity>
        )

    }
}


const styles = StyleSheet.create({
    bgImageStyle: {
        width:screen.width - 32,
        height: 108
    },
    comicImageStyle: {
        width: 88,
        height: 116
    },
    topImageStyle: {
         flex:1,
         flexDirection: 'column',
         alignItems: 'center',
         marginLeft:16,marginRight:16,
    },
    adDialogStyle: {
        width: 222,
        height: 114,
        marginLeft: 6,
        padding:30,
        alignItems: 'center',
    },
    nameStyle: {
        fontSize: dimmension.text_size_class_4,
        color: colorInner.text_color_c101,
    },
    introStyle: {
        fontSize: dimmension.text_size_class_3,
        color: colorInner.text_color_c103,
    },
    redNumStyle: {
        fontSize: dimmension.text_size_class_2,
        color: colorInner.text_color_c701,
    },
    adTextStyle: {
        fontSize: dimmension.text_size_class_3,
        color: colorInner.text_color_c102,
    },
});