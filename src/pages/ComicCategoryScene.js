/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 // 需要注意的是，不论是bind还是箭头函数，每次被执行都返回的是一个新的函数引用，因此如果你还需要函数的引用去做一些别的事情（譬如卸载监听器），那么你必须自己保存这个引用
 //
 // // 错误的做法
 // class PauseMenu extends React.Component{
 //     componentWillMount(){
 //         AppStateIOS.addEventListener('change', this.onAppPaused.bind(this));
 //     }
 //     componentDidUnmount(){
 //         AppStateIOS.removeEventListener('change', this.onAppPaused.bind(this));
 //     }
 //     onAppPaused(event){
 //     }
 // }
 // // 正确的做法
 // class PauseMenu extends React.Component{
 //     constructor(props){
 //         super(props);
 //         this._onAppPaused = this.onAppPaused.bind(this);
 //     }
 //     componentWillMount(){
 //         AppStateIOS.addEventListener('change', this._onAppPaused);
 //     }
 //     componentDidUnmount(){
 //         AppStateIOS.removeEventListener('change', this._onAppPaused);
 //     }
 //     onAppPaused(event){
 //     }
 // }
 // 
 * @flow
 */
import React, {PureComponent} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  InteractionManager,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import screen from '../common/screen'
import ComicCategoryItem from '../widget/component/ComicCategoryItem'
// import SearchTabView from '../widget/SearchTabView'
import SearchTabView from '@tencent/com.qqreader.searchtab/android/searchtablelib'
import Request from '../common/request'
import { StackNavigator } from 'react-navigation'
import titleStyle from '../common/titleStyle'

class ComicCategoryScene extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title:props.navigation.state.params.title,
      itemList:[],
      isLoadingMore: false,
      refreshing: true,
      pageNumeber: 1,
      showSearchTabIndex:0,
      searchTabData:``, 
      searchSelecteRule:"actionTag=,-1,-1,-1,-1,-1&actionId=50002",
      mustSelectedIds:"30015",
      searchInitSelectedJson:'[{"itemShouldInvisible":false,"selectedItemIds":[1],"selectedSubId":1}]',
    };
    this.props.searchTabItem = [];
  //  { (this: any).requestData = this.requestData.bind(this) }
    InteractionManager.runAfterInteractions(() => {
      this.requestData(false);
    });
    this._onDoSearch = this._onDoSearch.bind(this);
    
    this.onBack = this.onBack.bind(this);

  };

  componentWillMount(){
    BackHandler.addEventListener("hardwareBackPress",this.onBack)
  }
  componentDidMount(){
    BackHandler.removeEventListener("hardwareBackPress",this.onBack)    
  }

  onBack(){

  }
  _onDoSearch(json:string){
    //console.log(json+" xxxxxxxxxxxxxxxxxxxxxx");
    // this.setState({searchData:json});
    // actionTag=,-1,-1,-1,-1,-1&actionId=50002
    // {"actionId":"","actionTag":"31122,-1,1,-1,-1,9"} 
    let data = JSON.parse(json);
    let para = "actionTag="+data.actionTag+"&actionId="+data.actionId;
    // para = para.replace(":",",");
    this.setState({searchSelecteRule:para});
    console.log(this.props.searchSelecteRule);
    this.requestData(false);
  }

  renderItem = ({item}) =>{ 
    let navigation = this.props.navigation
    return (<ComicCategoryItem comicItem={{item}} navigation = {navigation}/>)
  };

  requestData(more) {
      var url = "http://android.reader.qq.com/v6_5_3/listDispatch?"+this.state.searchSelecteRule+"&action=comicCat&pagestamp=";
      let dataMap = [];
      let index = 0;
      let pageNumeber = 1;
      if (more) {
        this.setState({
          isLoadingMore: true,
          refreshing: false
        });
        dataMap = this.state.itemList;
        index = this.state.itemList.length;
        pageNumeber = this.state.pageNumeber;
      } else {
        this.setState({pageNumeber: 1, isLoadingMore: false, refreshing: true});
        dataMap = this.state.dataList;
        index = 0;
        pageNumeber = 1;
      }
      if (dataMap==null) {
        dataMap = [];
      }
      url += pageNumeber;
      Request.get(url,(data)=>{
    //  console.log(data);
        this.setState({pageNumeber:data.pagestamp});
        if(data.info){
          // console.log(JSON.stringify(data.info));
          console.log(JSON.stringify(data.info));
          this.setState({searchTabData:JSON.stringify(data.info)});
        }
        if(data.bookList){
          let dataList = data.bookList.map((info) => {
            return {
              iconUrl: this.getComicUrl(info.bid),
              title: info.title,
              bid:info.bid,
              content: info.intro,
              author: info.author,
              num:info.num,
              classify: info.categoryName,
              rightTips: info.num,
              tipsType: info.type
            }
          }).map((item)=>{
              dataMap.push({
                  key:++index,
                  value:item,
              });
          });
        }
        this.setState({itemList: dataMap, isLoadingMore: false, refreshing: false});
      },(error)=>{
        alert(error);
      })
  }

  getComicUrl(bid){
      return "http://public-1252317822.image.myqcloud.com/cover/"+bid+"/cover.jpg?imageView2/2/w/282/h/372";
  }

  refreshData() {
    console.log("refreshData");
    this.requestData(false);
  }

  requestMore() {
    console.log("requestMore");
    if (this.state.itemList.length>0) {
        this.requestData(true);
    }
  }
  onEndReached() {
    if (this.state.itemList.length > 0 && !this.state.isLoadingMore && !this.state.refreshing) {
      this.requestMore();
    }
  }

  renderFooter(){
    let hasMore = this.state.pageNumeber>0;
    if (this.state.itemList==null||this.state.itemList.length==0) {
        return null;
    }

    return (
        <View key={1} style={{flex:1,flexDirection:'row',justifyContent:'center',height:60,width:screen.width, alignItems: 'center'}}>
            <Image source={require('../images/icon_star_click_more.png')}/>
            <Text style={{marginLeft:10}}>{hasMore ? '加载中。。。':'没有更多。。。'}</Text>
        </View>
    );

  }
  render() {
      return (
            <View style={{height:(screen.height),backgroundColor:'#f4f4f4',flexDirection:'column'}}>    
              <View style={titleStyle.titleContainer}>
                  <Text style={titleStyle.titleText}>{this.state.title}</Text>
              </View>             
              <FlatList
                style={{position:'absolute',left:0,right:screen.width,top:(45+40),bottom:screen.height,width:screen.width,height:(screen.height-50),flex:1}}
                data={this.state.itemList}
                renderItem={this.renderItem}
                ListFooterComponent={this.renderFooter.bind(this)}
                onRefresh={()=>{
                    this.requestData(false);
              }}
              // onEndReached={this.onEndReached.bind(this)}
              onEndReached = {()=>{
                if (this.state.itemList.length > 0 && !this.state.isLoadingMore && !this.state.refreshing) {
                    this.requestMore();
                }
              }}
              onEndReachedThreshold ={0.5}
              refreshing={this.state.refreshing}/>           
              <SearchTabView onDoSearch={(json)=>this._onDoSearch(json)} searchTabData={this.state.searchTabData} ref={(ref)=>{
                this._searchTabView=ref
              }} style={{height:40,backgroundColor:'green'}}
              onTitleSelected = {(index ,state)=>{
                console.log("index="+index+" state="+state)}
              }
              tabType = {SearchTabView.defaultProps.DEFAULT_TYPE_COMIC_CLASSIFY}
              useLocation={6}
              mustSelectedIds = {this.state.mustSelectedIds}
              searchInitSelectedJson={this.state.searchInitSelectedJson}
              />
            </View>    
         
      );
  }

}

const styles = StyleSheet.create({
  container: {
    height: screen.height,
    width: screen.width,
    backgroundColor: '#F5FCFF'
  },
});

export default ComicCategoryScene;
