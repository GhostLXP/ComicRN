import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  Dimensions,
  AlertIOS,
  Animated,
  RefreshControl,
  InteractionManager,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native'
import Config from '../../common/config';
import Request from '../../common/request';
import Button from '../../widget/Button';
import RankListCell from '../rank/RankListCell'

const INIT_PAGE_INDEX = 2;

export default class RankList extends Component {

  constructor(props){
    super(props)
    this.state = {
      tabs:[],
      currentTabIndex:0,
      currentActionId:0,
      rankBookList:[],
      actionIdList:[],
      refreshing:false,
      pageIndex:INIT_PAGE_INDEX
    }
  }

  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      this.loadTabListData();
    });
    this.props.onRef(this)
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  loadTabListData(){
    Request.get(Config.api.rankTabListUrl+'rankFlag='+this.props.rankFlag, (data) => {
      console.log(data);
      let tabList = data.rank;
      this.setState({
        tabs: tabList,
        currentTabIndex:0,
        currentActionId:tabList[0].actionId,
        rankBookList:[],
        actionIdList:[],
        refreshing:false,
        pageIndex:INIT_PAGE_INDEX
      }, 
      ()=>{
        this.loadListData();
      });
    }, (error) => {
      console.log(error);
    });
  }

  loadListData(){
    this.setState(
    {
      refreshing:true,
      pageIndex:INIT_PAGE_INDEX
    },
    ()=>{
      let actionId = this.state.currentActionId;
      Request.get(Config.api.rankDetailListUrl+'action=rank'+'&ationTag='+this.props.actionTag+'&actionId='+actionId,
       (data) => {
        let bookList = data.bookList;
        let idList = data.info.actionIdList;
        this.setState({
          rankBookList: bookList,
          actionIdList: idList,
          refreshing:false
        });
      }, (error) => {
        console.log(error);
        this.setState({
          refreshing:false
        });
      });
    }
    );
  }

  loadMoreListData(){
    if(this.state.pageIndex == 0){
      return;
    }
    this.setState(
    {
    },
    ()=>{
      let actionId = this.state.currentActionId;
      Request.get(Config.api.rankDetailListUrl+'action=rank'+'&ationTag='+this.props.actionTag+'&actionId='+actionId+'&pagestamp='+this.state.pageIndex, 
        (data) => {
          let bookList = data.bookList;
          let idList = data.info.actionIdList;
          this.setState({
            rankBookList: this.state.rankBookList.concat(bookList),
            actionIdList: idList,
            pageIndex:data.pagestamp
          });
        }, (error) => {
          console.log(error);
        });
    }
    );
  }

  onClickTab(index){
    this.setState({
      currentTabIndex: index,
      currentActionId:this.state.tabs[index].actionId,
      rankBookList: [],
      actionIdList: [],
      refreshing:false
    },
    ()=>{
      this.loadListData();
    });
  }

  renderLeftTab(){
    let tabs = this.state.tabs;
    return (
      <View style={{flex: 1}}>
      {
        tabs.map((item, i) => {
          return (
            <Button key={i} onPress={()=>{this.onClickTab(i)}}>
            <View style={[styles.typeItem, this.state.currentTabIndex==i?styles.active:null]}>
            <Text numberOfLines={1} style={{fontSize: 16, color: "#000000"}}>{item.title}</Text>
            </View>
            </Button>
            )
        })
      }
      </View>
      );
  }

  renderFooter = ()=>{
    if(this.state.refreshing){
      return null;
    }

    if(this.state.pageIndex == 0){
      return(
        <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE",
          alignItems: 'center'
        }}
        >
        <Text>已加载全部</Text>
        </View>
        );
    }else{
      return (
        <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
        >
        <ActivityIndicator animating size="large" />
        </View>
        );
    }
  }

  renderSeparator = ()=>{
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#f2f2f2"
        }}
      />
    );
  }

  renderList(){
    return(
      <View style={{flex: 4}} >
      <FlatList
      data={this.state.rankBookList}
      renderItem={({item}) => <RankListCell book={item}/>}
      refreshing={this.state.refreshing}
      onRefresh={()=>{
        this.loadListData();
      }}
      onEndReached={
        ()=>{
          this.loadMoreListData();
        }
      }
      onEndThreshold={0}
      keyExtractor={item => item.bid}
      ListFooterComponent={this.renderFooter}
      ItemSeparatorComponent={this.renderSeparator}
      />
      </View>
      );
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
      {this.renderLeftTab()}
      {this.renderList()}
      </View>
      );
  }
}

const styles = StyleSheet.create({
  typeItem: {
    width:80,
    flexDirection: "row",
    alignItems:"center",
    paddingVertical: 15,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
    backgroundColor:"#f2f2f2"
  },
  active: {
    borderLeftWidth: 3,
    borderLeftColor: "#3190e8",
    paddingLeft: 7,
    backgroundColor: "#fff",
    borderBottomColor: "#fff",
  }
})
