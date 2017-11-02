//漫画目录
import React, {
	PureComponent
} from 'react';

import {
	Text,
	View,
	Image,
	StyleSheet,
	TouchableHighlight,
	ToastAndroid,
    Platform,
    AlertIOS,
} from 'react-native';

import Color from '../../common/color'
import ComicCellSeparatorComponent from '../../widget/component/ComicCellSeparatorComponent'
import ComicBookListItemsComponent from '../../widget/component/ComicBookListItemsComponent'
import ComicCellMoreComponent from '../../widget/component/ComicCellMoreComponent'

export default class ComicBookListCell extends PureComponent {
	render() {
		let item = this.props.item
		console.log("ComicBookListCell",item)
		return (
			<View>
				<View style = {styles.titleContainer}>
                	<Text style = {styles.title}>
                	    {item.title}
                	</Text>
                	<Text style = {styles.subtitle}>
                	    {item.subTitle}
                	</Text>
                </View>
                <ComicBookListItemsComponent
                	items = {item.data.bookSheet}
                	style = {styles.commonItems}>
                </ComicBookListItemsComponent>
                <TouchableHighlight  onPress={()=> this.onPressButton()} activeOpacity ={0.5} underlayColor={"#e3e4e5"} >
                <View>
                <ComicCellMoreComponent
                      size={item.data.bookSheet.length}
                      item = {item.data.hasMore}
                />
                </View>
                </TouchableHighlight>
				<ComicCellSeparatorComponent/>
			</View>
		)
	}
	onPressButton(){
	    console.log("查看更多")
	        var msg="收录了本书的书单"
               	      if (Platform.OS === 'android') {
                           ToastAndroid.show(msg, ToastAndroid.SHORT)
                         } else {
                           AlertIOS.alert(msg);
                         }
	}
}

const styles = StyleSheet.create({
	titleContainer: {
    		flex: 1,
    		flexDirection: 'row',
    		marginLeft: 15,
    		marginRight: 15,
    		marginTop:12,
    		alignItems: 'center',
    	},
    title: {
    		fontSize: 16,
    		fontWeight:"bold",
    		color: Color.text_color_c101,
    	},
    subtitle: {
    		fontSize: 10,
    		color: Color.text_color_c103,
    		marginLeft:6,
    	},
    commonItems: {
    		marginLeft: 15,
    		marginBottom:12
    	},
})