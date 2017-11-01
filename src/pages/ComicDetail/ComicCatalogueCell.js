//漫画目录
import React, {
	PureComponent
} from 'react';

import {
	Text,
	View,
	Image,
	StyleSheet,
	TouchableOpacity,
	TouchableHighlight
} from 'react-native';

import Color from '../../common/color'
import ComicCellSeparatorComponent from '../../widget/component/ComicCellSeparatorComponent'

export default class ComicCatalogueCell extends PureComponent {
	render() {
		let item = this.props.item
		console.log('ComicCatalogueCell:', item)
		return (
			<View>
			 <TouchableHighlight  onPress={()=> this.onPressButton()} activeOpacity ={0.5} underlayColor={"#e3e4e5"} >
				<View style = {styles.container}>
					<View style = {{
						flexDirection: "row",
						alignItems: 'center',
					}}>
						<Text style = {{
							fontSize: 16,
							color:Color.text_color_c101,
						}}>
						{item.title}
						</Text>

						<Text style = {{
							fontSize: 12,
							marginLeft: 6,
							color: Color.text_color_c103
						}}>
						{item.data.updateSec}
						</Text>
					</View>

					<View style = {{
						flexDirection: "row",
						alignItems: 'center',
					}}>
						<Text style = {{
						fontSize: 12,
						marginRight: 6,
						color: Color.text_color_c103,
						}}>
						{item.data.updateTime}
						</Text>
						<View style={{marginRight: 6,}}>
                        	<Image style={{width:6,height:12}} source={require('../../images/list_item_enter_icon.png')}></Image>
                        </View>
					</View>
				</View>
				</TouchableHighlight>
				<ComicCellSeparatorComponent/>
			</View>
		)
	}
	onPressButton(){
	    console.log("查看目录")
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: 'space-between',
		alignItems: 'center',
		marginLeft: 15,
		marginRight: 15,
		height: 50,
	},
})