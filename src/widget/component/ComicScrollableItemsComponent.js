/**
 * 漫画详情页可滑动的书籍列表样式
 */

 import React, {
 	PureComponent,
 } from 'react';

 import {
 	FlatList,
 	Text,
 	View,
 	StyleSheet,
 	Image,
 	TouchableOpacity
 } from 'react-native'

 import {getComicCoverUrlByBid} from '../../common/tools'
 import Color from '../../common/color'


 export default class ComicScrollableItemsComponent extends PureComponent {
 	keyExtractor(item) {
 		return item.cid;
 	}
    onPressImg(id){
        console.log(id)
    }
 	_renderItem({item}) {
 		return (
 			<View style = {styles.singleBookView}>
 			    <TouchableOpacity  onPress={()=> this.onPressImg(item.title)} activeOpacity ={0.5}>
 				<Image 
 				source = {{ uri:getComicCoverUrlByBid(item.cid) }}
 				style = {styles.bookCover}>
 				</Image>
                </TouchableOpacity>
 				<Text style = {styles.title} numberOfLines = {1}>
 				{item.title}
 				</Text>
 			</View>
 		)
 	}

 	_separator = ()=> {
 		return (
 			<View style ={{width: 110, height: 14}}>

 			</View>
 		)
 	}

 	render() {
	 	let items = this.props.items
	 	return (
	 		<View style={styles.container}>
	 			<FlatList
	 				data = {items}
	 				keyExtractor = {this.keyExtractor}
	 				horizontal = {true}
	 				showsHorizontalScrollIndicator={false}
	 				renderItem = { this._renderItem.bind(this) }
	 			/>
	 		</View>
	 	)
 	}
 }

 const styles = StyleSheet.create({
 	container: {
 		backgroundColor: 'white'
 	},

 	bookCover: {
 		width: 82,
 		height: 110,
 	},

 	title: {
 		color: Color.text_color_c101,
 		fontSize: 14,
 		marginTop: 10,
 		marginBottom: 10,
 	},

 	subtitle: {
 		color: Color.text_color_c103,
 		fontSize: 12,
 		marginTop: 8,
 	},

 	singleBookView: {
 		width: 84,
 		marginLeft:12,
 	}
 });