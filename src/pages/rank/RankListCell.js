
import React, { PureComponent } from 'react'

import {
	StyleSheet,
	Text,
	Image,
	View,
	Dimensions,
	TouchableOpacity
} from 'react-native';

import {getCoverUrlByBid} from '../../common/tools';
import {screen} from '../../common';

export default class RankListCell extends PureComponent {
	render() {
		let {book} = this.props;
		let imageUrl = getCoverUrlByBid(book.bid);
		return (
			<TouchableOpacity onPress={() => this.props.onPress(book)} style={styles.root}>
			<Image source={{ uri: imageUrl }} style={styles.cover} />
			<View style={styles.rightContainer}>
			<Text style={styles.title}>{book.title}</Text>
			<Text numberOfLines={2} style={styles.intro}>{book.intro}</Text>
			<View style={{flexDirection: 'row'}}>
			<Text style={styles.author}>{book.author}</Text>
			<Text style={styles.catel3name}>{book.catel3name}</Text>
			</View>
			</View>
			</TouchableOpacity>
			);

	}
}

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		paddingLeft: 16,
		paddingRight: 16,
		paddingTop:14,
		paddingBottom:14
	},
	cover: {
		width: 50,
		height: 67,
		alignItems: 'center',
        justifyContent: 'center',
	},
	rightContainer: {
		flex: 1,
		paddingLeft: 12,
		flexDirection: 'column'
	},
	title: {
		fontSize : 16,
		color : '#141414'
	},
	intro: {
		fontSize : 14,
		color : '#999999'
	},
	author: {
		fontSize : 12,
		color : '#999999'
	},
	catel3name: {
		fontSize : 10,
		color : '#99664b',
		flex: 1, 
		textAlign:'right'
	}
});
