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
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image
} from 'react-native'
export default class entranceGridItem extends PureComponent {
	render() {
		let info = this.props.info

		let title = info.title
		let imageUrl = info.imageUrl

		return (
			<TouchableOpacity style={styles.container} onPress={this.props.onPress}>

			<View style={styles.userInfoStyle}>

			 <Image style={styles.iconStyle} source={{ uri: imageUrl }} />
			  <Text style={styles.nameStyle} >{title}</Text>
			 </View>
            </TouchableOpacity>
		);
	}
}
import {
	screen,
	system,
	tool
} from '../../common'
const styles = StyleSheet.create({
	userInfoStyle: {
		justifyContent: 'center',
		width: screen.width / 4 - screen.onePixel,
		alignItems: 'center',
	},
	iconStyle: {
		width: 40,
		height: 40,
		marginTop: 10,

		alignItems: 'center'
	},
	nameStyle: {
		fontSize: 14,
		marginTop: 4,
		fontSize: 16,
		marginBottom: 8,
		color: '#666666',
	},
});