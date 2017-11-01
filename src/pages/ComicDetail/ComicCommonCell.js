//漫画目录
import React, {
	PureComponent
} from 'react';

import {
	Text,
	View,
	Image,
	StyleSheet,
	TouchableHighlight
} from 'react-native';

import Color from '../../common/color'
import ComicCellSeparatorComponent from '../../widget/component/ComicCellSeparatorComponent'
import ComicCommonItemsComponent from '../../widget/component/ComicCommonItemsComponent'
import ComicCellMoreComponent from '../../widget/component/ComicCellMoreComponent'

export default class ComicCommonCell extends PureComponent {
	render() {
		let item = this.props.item
		console.log('ComicCommonCell:', item)
		return (
			<View>
				<View style = {styles.titleContainer}>
                	<Text style = {styles.title}>
                	    {item.title}
                	</Text>
                	<Text style = {styles.subtitle}>
                	    {item.data.commentorCount+"评论，"+item.data.commentcount+"人参与"}
                	</Text>
                </View>
                <ComicCommonItemsComponent
                	items = {item.data.commentlist}
                	style = {styles.commonItems}>
                </ComicCommonItemsComponent>
                <TouchableHighlight onPress={()=> this.onPressButton()} activeOpacity ={0.5} underlayColor={"#e3e4e5"}>
                    <View>
                        <ComicCellMoreComponent
                            size={item.data.commentlist.length}
                            item = {item.data.more}
                        />
                    </View>
                </TouchableHighlight>
				<ComicCellSeparatorComponent/>
			</View>
		)
	}
	onPressButton(){
	    console.log("去评论区逛逛")
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
    		alignItems: 'center',
    	},
    title: {
    		fontSize: 16,
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