/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan  
 * @flow
 */

//import liraries

import React, {
	PureComponent
} from 'react'
import {
	screen,
	system,
	colorInner,
	dimmension,
	tool
} from '../../common'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
} from 'react-native'

import ComicDetail from '../../pages/ComicDetail/ComicDetail'

let item_width = (screen.width - 48) / 2
export default class ItemForFourItemCommponent extends PureComponent {
	render() {
		let info = this.props.info
		let title = info.name
		let imageUrl = info.bookCover === undefined ? info.imgurl: info.bookCover
		let intro = info.intro === undefined ? intro = info.desc: intro = info.intro
		return (
			<TouchableOpacity style={styles.container}
			  onPress={() => {this.onBookClicked(info.bid)}}>

			<View style={styles.userInfoStyle}>

				 <Image style={styles.iconStyle} source={{ uri: imageUrl }}>
					<View style = {styles.shadowStyle}>
	                  <Text numberOfLines={1} style={styles.nameStyle} >{title}</Text>
		 			 <Text  numberOfLines={1} style={styles.introStyle} >{intro}</Text>
	                </View>
				 </Image>

			 </View>
            </TouchableOpacity>
		);
	}

	onBookClicked(comicId) {
        console.log('click book, comicId: ' + comicId)
        let navigator  = this.props.navigation
        if (navigator) {
            navigator.navigate('ComicDetail', {comicId : comicId})
        }
    }
}

const styles = StyleSheet.create({
	 container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
	userInfoStyle: {
		flexDirection:'row',
		width: screen.width / 2 - 8,
		justifyContent: 'center',

	},
	iconStyle: {
		flexDirection: 'row',
		width: item_width,
		height: 156,
		marginTop: 10,
		alignItems:'flex-end',
	},
	shadowStyle: {
		flexDirection: 'column',
		width: item_width,
		paddingLeft:8,
		paddingRight:8,
		justifyContent: 'space-around',
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		height: 48,
	},
	nameStyle: {
		fontSize: dimmension.text_size_class_3,
		color: colorInner.text_color_c101,
	},
	introStyle: {
		fontSize: dimmension.text_size_class_2,
		color: colorInner.text_color_c103,
	},
});
