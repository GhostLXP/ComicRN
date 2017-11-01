//漫画简介
import React, {
	PureComponent
} from 'react';

import {
	Text,
	View,
	StyleSheet,
} from 'react-native';

import Color from '../../common/color'

export default class ComicCopyRightCell extends PureComponent {
	render() {
		let item = this.props.item
		console.log('ComicCopyRightCell:', item)
		return (
			<View>
				<View
					style = {styles.container}
				>
                    <Text style={styles.texttitle}>{item.title}</Text>
                    <View style={{marginTop:10}}>
                    	<Text style={styles.text}>{item.data.copyright}</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={styles.text}>{item.data.provide}</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={styles.text}>{item.data.desc}</Text>
                    </View>
                </View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	text: {
		fontSize: 14,
		lineHeight: 18,
		color: Color.text_color_c102,
	},
	texttitle: {
		fontSize: 16,
		lineHeight: 18,
		color: Color.text_color_c101,
	},
	container: {
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 12,
		marginTop: 12,
		flexDirection: 'column',
	}
})