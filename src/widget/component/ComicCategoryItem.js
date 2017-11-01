import React, {
    PureComponent
} from 'react';

import {
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    InteractionManager,
    Image,
    View
} from 'react-native';
import screen from '../../common/screen'

class ComicCategoryItem extends PureComponent{

    constructor(props){
        super(props);
    }

    onPressButton(data){
      console.log(data.item.value.title);
      // this.props.navigator();
      let navigation = this.props.navigation
      if(navigation){
        navigation.navigate('BookDetail',{bid:data.item.value.bid});
      }

    }

    renderBottomRight(comicItem){
        let views = [];
        if (comicItem.item.value.classify!=null&&comicItem.item.value.classify!="") {
          views.push(<Text numberOfLines={1} key={1} style={[styles.comicClassify,styles.borderStyle,{borderColor:'#141414'}]}>{comicItem.item.value.classify}</Text>);
          views.push(<Text numberOfLines={1} key={2} style={[styles.numberStyle,styles.borderStyle,{marginLeft:2}]}>{comicItem.item.value.rightTips}</Text>);
        }else{
          views.push(<Text numberOfLines={1} key={1} style={[styles.numberStyle,styles.borderStyle,{marginLeft:2}]}>{comicItem.item.value.rightTips}</Text>);
        }
        return views;
    }


    render(){
      let {comicItem} = this.props;
      return(
        //onPress={this._pressButton.bind(this)
        <View style={{flexDirection:'column',flex:1}}>
            <TouchableOpacity  onPress={()=> this.onPressButton(comicItem)} style={styles.container}>
                <Image style={styles.icon} source={{uri:comicItem.item.value.iconUrl}}/>
                <View style={{height:90,width:screen.width,flex:1,flexDirection:'column',paddingLeft:4,justifyContent:'space-between'}}>
                    <View style={{flexDirection:'column'}}>
                        <Text style={styles.title} numberOfLines={1}>{comicItem.item.value.title}</Text>
                        <Text style={styles.content} numberOfLines={3}>{comicItem.item.value.content}</Text>
                    </View>
                    <View style={styles.bottomTips}>
                          <View style={{flexDirection:'row'}}>
                              <Image style={styles.authorIcon} source={require('../../images/card_author_icon.png')}/>
                              <Text style={styles.authorTxt}>{comicItem.item.value.author}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                              {this.renderBottomRight(comicItem)}
                          </View>

                    </View>
                </View>
            </TouchableOpacity>
            <View style={{backgroundColor:'#dddddd',height:0.5}}/>
        </View>
      );

    }
}
const styles = StyleSheet.create( {
  container: {
    paddingBottom:12,
    paddingLeft:16,
    paddingRight:16,
    paddingTop:12,
    flexDirection:'row',
    flex: 1,
    justifyContent: 'flex-start'
  },
  icon: {
    height: 91,
    width: 68,
    backgroundColor: 'gray'
  },
  title:{
    fontSize:10,
    color:'#141414',
    fontSize:16,
    alignItems:'flex-end'
  },
  content: {

  },
  authorIcon:{
    marginTop:2,
    height:16,
    width:16,
    alignItems:'flex-end'
  },
  authorTxt:{
    marginTop:2,
    fontSize:12,
    marginLeft:2
  },
  comicClassify:{
    marginTop:2,
    fontSize:10,
    alignItems:'flex-end'
  },
  numberStyle:{
    height:15,
    marginTop:2,
    fontSize:10
  },
  bottomTips : {
    flex: 1,
    flexDirection: 'row',
    height: 10,
    justifyContent:'space-between'
  },
  borderStyle:{
    paddingLeft:2,
    paddingRight:2,
    borderRadius:2,
    borderWidth:0.3,
    borderColor:'#973365'
  }

});

export default ComicCategoryItem;
