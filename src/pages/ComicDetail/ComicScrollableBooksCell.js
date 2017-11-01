//同类热门漫画
import React, {
	PureComponent
} from 'react'

import {
	View,
	Text,
	StyleSheet
} from 'react-native'

import ComicScrollableItemsComponent from '../../widget/component/ComicScrollableItemsComponent'
import Color from '../../common/color'
import ComicCellSeparatorComponent from '../../widget/component/ComicCellSeparatorComponent'


export default class ComicScrollableBooksCell extends PureComponent {
	render() {
		let item = this.props.item
		console.log('ComicScrollableBooksCell',item)
		return (
			<View style = {{flex:1}}>
				<View style = {styles.titleContainer}>
					<Text style = {styles.title}>
					{item.title}
					</Text>
					<Text style = {styles.subtitle}>
					{item.subTitle}
					</Text>
				</View>

				<ComicScrollableItemsComponent 
				items = {item.data}
				style = {styles.scrollView}>
				</ComicScrollableItemsComponent>

				<ComicCellSeparatorComponent/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	titleContainer: {
		flex: 1,
		flexDirection: 'row',
		marginLeft: 15,
		marginRight: 15,
		marginTop:12,
		marginBottom:12,
		alignItems: 'flex-end',
	},

	scrollView: {
		marginLeft: 15,
		marginBottom:12
	},

	title: {
		fontSize: 16,
		color: Color.text_color_c101,
	},

	subtitle: {
		fontSize: 12,
		color: Color.text_color_c101
	}
})