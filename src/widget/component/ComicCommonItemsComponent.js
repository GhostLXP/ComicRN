/**
 * 评论区的列表样式
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
 	TouchableHighlight,
 	TouchableOpacity
 } from 'react-native'

 import {getComicCoverUrlByBid} from '../../common/tools'
 import Color from '../../common/color'


 export default class ComicCommonItemsComponent extends PureComponent {
 	keyExtractor(item) {
 		return item.commentid;
 	}
    onPressItem(id){
        console.log('书评id:'+id)
    }
    onPressUser(id){
            console.log('userid:'+id)
    }
 	_renderItem({item}) {
 		return (
 		 <TouchableHighlight  onPress={()=> this.onPressItem(item.commentid)} activeOpacity ={0.5} underlayColor={"#e3e4e5"} >
 					<View>
            			<View style={{flexDirection: 'row',
            				marginLeft: 15,
            				marginRight: 15,
            				marginTop: 12,
            				alignItems: 'center',}}>
            				<TouchableOpacity  onPress={()=> this.onPressUser(item.userid)} activeOpacity ={0.5}>
            				<Image
             				source = {{ uri:item.user.icon }}
             				style = {styles.userCover}>
             				</Image>
             				</TouchableOpacity>
             				<TouchableOpacity  onPress={()=> this.onPressUser(item.userid)} activeOpacity ={0.5} >
             				<Text style = {styles.username} numberOfLines = {1}>
             				{item.user.nickname}
             				</Text>
             				</TouchableOpacity>
            			</View>
            			<Text style = {styles.content} numberOfLines = {4}>
             				{item.content}
             			</Text>
             			<View style={{flexDirection: 'row',
            				marginLeft: 48,
            				marginTop:8,
            				marginBottom:8,
            				marginRight:20,
            				justifyContent: 'space-between',
            				alignItems: 'center',}}>
            				<Text style = {styles.platformname} numberOfLines = {1}>
             				{item.platformname}
             				</Text>
             				<View style={{flexDirection: 'row',
                                marginLeft: 12,
                                alignItems: 'center',
                                }}>
             					<Text style = {styles.replycount} numberOfLines = {1}>
             					{"回复 "+item.replycount}
             					</Text>
             					<Text style = {styles.agree} numberOfLines = {1}>
             					{"赞 "+item.agree}
             					</Text>
             				</View>
            			</View>
             			<View
                            style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: "#f2f2f2"
                            }}
                        />
             		</View>
         </TouchableHighlight>
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
	 				horizontal = {false}
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

 	userCover: {
 		width: 28,
 		height: 28,
 		borderRadius:14
 	},

 	username: {
 		color: Color.text_color_c201,
 		fontSize: 12,
 		marginLeft: 6,
 	},

 	content: {
 		color: Color.text_color_c102,
 		fontSize: 14,
 		marginTop: 9,
 		marginLeft: 48,
 		marginRight:15,
 		lineHeight: 24,
 	},
    agree: {
 		color: Color.text_color_c103,
 		fontSize: 10,
 		marginLeft:24
 	},
 	replycount: {
     	color: Color.text_color_c103,
     	fontSize: 10,
    },
    platformname: {
     	color: Color.text_color_c103,
     	fontSize: 10,
     },
 	singleCommonView: {
 		height: 84,
 	}
 });