//运营广告位
import React, {
	PureComponent
} from 'react';

import {
	Text,
	View,
	Image,
	StyleSheet,
	TouchableWithoutFeedback
} from 'react-native';

import ComicCellSeparatorComponent from '../../widget/component/ComicCellSeparatorComponent'

export default class ComicAdvCell extends PureComponent {
	render() {
		let item = this.props.item
		console.log("ComicAdvCell",item)
		if(item.data.length>0){
		return (
			<View>
			    <TouchableWithoutFeedback onPress={()=> this.onPressButton()}>
				<Image
                     source = {{ uri:item.data[0].imgUrl}}
                     style = {{height:80,width:"100%",resizeMode:"stretch"}}>
                </Image>
                </TouchableWithoutFeedback>
            <ComicCellSeparatorComponent/>
			</View>
		)
		}
		else{
		return (<View />)
		}
	}
	onPressButton(){
	    console.log("广告位点击")
	}
}
