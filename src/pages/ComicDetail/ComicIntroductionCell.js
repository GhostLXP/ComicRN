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
import ComicCellSeparatorComponent from '../../widget/component/ComicCellSeparatorComponent'

export default class ComicIntroductionCell extends PureComponent {
	render() {
		let item = this.props.item
		console.log('ComicIntroductionCell',item)
		return (
			<View>
				<View 
					style = {styles.container}
				>
					<Text style = {styles.text}
					    numberOfLines ={4}
                        ellipsizeMode='tail'>
						{item.intro}
					</Text>
				</View>
				<View
                     style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "#f2f2f2"
                        }}
                />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	text: {
		fontSize: 14,
		lineHeight: 24,
		color: Color.text_color_c102,
	},

	container: {
		marginLeft: 15,
		marginRight: 15,
		marginTop: 5,
		marginBottom: 10,
	}
})