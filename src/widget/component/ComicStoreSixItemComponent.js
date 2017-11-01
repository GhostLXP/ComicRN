import React, { PureComponent } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import Color from '../../common/color'
import ComicStoreBookComponent from './ComicStoreBookComponent'

export default class ComicStoreSixItemComponent extends PureComponent{

    render(){

        let { cardItem } = this.props

        return(
            <View style = {{flexDirection:'column'}}>
                
                <View style = {{flexDirection:'row',alignItems:'flex-end',paddingLeft:16,paddingRight:16}} >
                    <View style = { { flex:1, backgroundColor : '#ffffff'}}>
                        <View style = {{flexDirection:'row',alignItems:'flex-end',justifyContent:'flex-start'}}>
                            <Text style = {{fontSize:18,color:Color.text_color_c101,fontWeight:'bold',marginTop:12}}>
                                {cardItem.title}
                            </Text>
                            <Text style = {{fontSize:12,color:Color.text_color_c101,fontWeight:'bold',paddingBottom:2}}>
                            {cardItem.subTitle}
                            </Text>
                        </View>

                        <Text style = {{fontSize:12,color:Color.text_color_c103,marginTop:4}}>
                            {cardItem.pushName}
                        </Text>
                    </View>
                    <Image  style={{width: 42, height: 42}}
                    source={{uri:cardItem.columnIcon}}
                    />
                </View>

                <View style = {{flexDirection:'row',justifyContent:'space-between',paddingLeft:16,paddingRight:16,marginTop:12}}>
                    <ComicStoreBookComponent 
                        style={{width:93,alignSelf:'flex-start'}}
                        bookItem = {cardItem.bookList[0]}
                        totalWidth = {93}
                    />
                    <ComicStoreBookComponent 
                        style={{width:93,alignSelf:'center'}}
                        bookItem = {cardItem.bookList[1]}
                        totalWidth = {93}
                    />
                    <ComicStoreBookComponent 
                        style={{width:93,alignSelf:'flex-end'}}
                        bookItem = {cardItem.bookList[2]}
                        totalWidth = {93}
                    />
                </View>

                <View style = {{flexDirection:'row',justifyContent:'space-between',paddingLeft:16,paddingRight:16,marginTop:12}}>
                    <ComicStoreBookComponent 
                        style={{width:93,alignSelf:'flex-start'}}
                        bookItem = {cardItem.bookList[3]}
                        totalWidth = {93}
                    />
                    <ComicStoreBookComponent 
                        style={{width:93,alignSelf:'center'}}
                        bookItem = {cardItem.bookList[4]}
                        totalWidth = {93}
                    />
                    <ComicStoreBookComponent 
                        style={{width:93,alignSelf:'flex-end'}}
                        bookItem = {cardItem.bookList[5]}
                        totalWidth = {93}
                    />
                </View>


                <View style={{flex:1,height:0.5,backgroundColor:'#f2f2f2',marginTop:12}}/>

                <TouchableHighlight
                    style={{backgroundColor:'#ffffff'}}
                    underlayColor={'#f2f2f2'} 
                    onPress={() => this.props.morePress(cardItem.cid)}
                    >
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
    
    /**
     * 
     * 
     */

}


const styles = StyleSheet.create({

    

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
      },
    title:{

    }

})