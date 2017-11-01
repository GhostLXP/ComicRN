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
 	TouchableHighlight
 } from 'react-native'

 import {getCoverUrlByBid} from '../../common/tools'
 import Color from '../../common/color'


 export default class ComicBookListItemsComponent extends PureComponent {
 	keyExtractor(item) {
 		return item.id;
 	}
 	onPressItem(id){
       console.log("书单"+id)
    }
 	_renderItem({item}) {
 		return (
 		<TouchableHighlight  onPress={()=> this.onPressItem(item.id)} activeOpacity ={0.5} underlayColor={"#e3e4e5"} >
 					<View>
                    		<View style={{
                    			flexDirection: 'row',
                    			marginLeft: 15,
                    			marginRight:10,
                    			marginTop:12,
                    			justifyContent: 'space-between',
                    			alignItems: 'center',
                    		}}>
                    			<View style={{width:"70%"}}>
                    				<Text style = {styles.sheetName} numberOfLines = {2} ellipsizeMode='tail'>
                               				{item.sheetName}
                               			</Text>
                               			<Text style = {styles.sheetIntro} numberOfLines = {1} ellipsizeMode='tail'>
                               				{item.sheetIntro}
                               			</Text>
                               			<View style={{flexDirection: 'row',
                              				marginTop:8,
                              				marginBottom:8,
                              				justifyContent: 'space-between',
                              				alignItems: 'center',}}>
                              				<View style={{flexDirection: 'row',
                              					marginTop: 12,
                              					alignItems: 'center',}}>
                              					<Image
                               						source = {{ uri:item.creator.icon }}
                               						style = {styles.userCover}>
                               					</Image>
                               					<Text style = {styles.username} numberOfLines = {1}>
                               						{item.creator.name}
                               					</Text>
                              				</View>
                              				<View style={{flexDirection: 'row',
                                                  alignItems: 'center',
                                                  }}>
                                                <View style={styles.bookNumView}>
                               					<Text style = {styles.bookNum} numberOfLines = {1}>
                               						{item.bookNum+"本"}
                               					</Text>
                               					</View>
                               					<View style={styles.storeNumView}>
                               					<Text style = {styles.storeNum} numberOfLines = {1}>
                               						{item.storeNum}
                               					</Text>
                               					</View>
                               				</View>
                    				</View>
                    			</View>
                    			<View style={{
                    				flexDirection: 'row',
                    				alignItems: 'center',
                    				justifyContent: 'flex-end',
                    				height:67,
                    				width:"30%",
                    			}}>
                    				    <Image
                               				source = {{ uri:getCoverUrlByBid(item.bids[2].bid)}}
                               				style = {styles.cover3}>
                               			</Image>
                               			<Image
                               				source = {{ uri:getCoverUrlByBid(item.bids[1].bid)}}
                               				style = {styles.cover2}>
                               			</Image>
                               			<Image
                               				source = {{ uri:getCoverUrlByBid(item.bids[0].bid)}}
                               				style = {styles.cover1}>
                               			</Image>
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
	 				renderItem = { this._renderItem.bind(this)}
	 			/>
	 		</View>
	 	)
 	}
 }

 const styles = StyleSheet.create({
 	container: {
 		backgroundColor: 'white'
 	},
 	sheetName:{
        fontSize: 14,
        color: Color.text_color_c101,
 	},
 	sheetIntro:{
        fontSize: 12,
        color: Color.text_color_c103,
        marginTop:5
    },
 	userCover: {
 		width: 12,
 		height: 12,
 		borderRadius:6
 	},

 	username: {
 		color: Color.text_color_c103,
 		fontSize: 12,
 		marginLeft: 6,
 	},
    storeNumView: {
     	marginLeft:12,
 		paddingLeft:4,
        paddingRight:4,
        borderWidth:1,
        borderColor:"#cccccc",
        borderRadius:1,
        alignItems:'center',
        justifyContent: 'center',
 	},
 	storeNum:{
 	    fontSize: 10,
 	    color: "#999999",
 	},
 	bookNumView: {
     	paddingLeft:4,
     	paddingRight:4,
     	borderWidth:1,
        borderColor:"#b8c3d9",
        borderRadius:1,
        alignItems:'center',
        justifyContent: 'center',
    },
    bookNum:{
       fontSize: 10,
       color: "#b8c3d9",
    },
 	cover3: {
     	width: 37,
     	height: 49,
     	marginRight:-20
    },
    cover2: {
        width: 44,
        height: 58,
        marginRight:-20
    },
    cover1: {
         width: 50,
         height: 67,
    },
 });