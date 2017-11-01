import React, {
	PureComponent
} from 'react';

import {
	View,
	Text,
} from 'react-native';

import Color from '../../common/color'
import ComicCellSeparatorComponent from '../../widget/component/ComicCellSeparatorComponent'

export default class ComicCellMoreComponent extends PureComponent {
	render() {
	let item = this.props.item
	let size=this.props.size
	if(size>0){
	      return (
              	<View>
                     <View
                         style={{
                             height: 1,
                             width: "100%",
                             backgroundColor: "#f2f2f2"
                         }}
                     />
                     <View style={{alignItems: 'center',flexDirection: "row",height:50,justifyContent:"center"}}>
                     <Text style={{color: Color.text_color_c301,
                                    		fontSize: 14,}}>{this.getMoreTextString(item.action)}
                     </Text>
                     </View>
                 </View>
        		)
	}else{
	    return(<View />)
	}

	}

     getMoreTextString(action) {
	    if("comment"==action){
	        return "去评论区逛逛";
	        }else{
	        return "查看更多"
	    }
    }
}

