import React, { PureComponent } from 'react';
import {
    Text,
    View,
    Image,
    TouchableHighlight,
} from 'react-native';
import screen from '../../common/screen'
import ComicStoreBookComponent from './ComicStoreBookComponent'

export default class ComicStoreFreeComponent extends PureComponent{

    render(){

        let { cardItem } = this.props;

        return(
            <View style = {{flexDirection:'column'}}>

                <View style = {{flexDirection:'row',justifyContent:'center',paddingLeft:16,paddingRight:16,marginTop:12}}>
                    <ComicStoreBookComponent
                        style={{width:screen.width-32, alignSelf:'stretch'}}
                        bookItem = {cardItem.bookList[0]}
                        totalWidth = {screen.width-32}
                        imageWidth = {screen.width-32}
                    />
                </View>

                <View style = {{flexDirection:'row',justifyContent:'space-between',paddingLeft:16,paddingRight:16,marginTop:12}}>
                    <ComicStoreBookComponent
                        style={{width:93,alignSelf:'flex-start'}}
                        bookItem = {cardItem.bookList[1]}
                        totalWidth = {93}
                    />
                    <ComicStoreBookComponent
                        style={{width:93,alignSelf:'center'}}
                        bookItem = {cardItem.bookList[2]}
                        totalWidth = {93}
                    />
                    <ComicStoreBookComponent
                        style={{width:93,alignSelf:'flex-end'}}
                        bookItem = {cardItem.bookList[3]}
                        totalWidth = {93}
                    />
                </View>

                <View style={{flex:1,height:0.5,backgroundColor:'#f2f2f2',marginTop:12}}/>

                <TouchableHighlight
                    style={{backgroundColor:'#ffffff'}}
                    underlayColor={'#f2f2f2'}
                    onPress={this.onMoreClick}>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',height:50}}>
                        <Text>
                            更多戳这里
                        </Text>
                        <Image style={{height:12,width:9}}
                               source={require('../../images/icon_star_click_more.png')}/>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    onMoreClick(){
        console.log("click more")
    }

}