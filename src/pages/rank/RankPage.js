import React, { Component } from 'react'
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Animated,
  AlertIOS,
  Platform,
  findNodeHandle,
  Image,
  TouchableOpacity
} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import {
  Menu,
  MenuContext,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';
import RankList from '../rank/RankList'

export default class RankPage extends Component {
  renderTitle(){
    return (
      <View style={{flexDirection: 'row'}}>
      <Text style={styles.title}>排行榜</Text>
      <View style={{height: 48, backgroundColor: "#3399FF", justifyContent: 'center', alignItems: 'center'}}>
      <Menu onSelect={value => alert(`Selected number: ${value}`)}>
      <MenuTrigger text='rank' />
      <MenuOptions>
      <MenuOption value={1} text='One' />
      <MenuOption value={2}>
      <Text style={{color: 'red'}}>Two</Text>
      </MenuOption>
      <MenuOption value={3} text='Three' />
      </MenuOptions>
      </Menu>
      </View>
      </View>
      );
  }

  render() {
    return (
      <MenuContext style={{flex: 1, backgroundColor: '#ffffff'}}>
      {this.renderTitle()}
      <ScrollableTabView page={0} >
      <RankList onRef={ref => (this.boyList = ref)} rankFlag='1' ationTag='boy' tabLabel="男生"/>
      <RankList onRef={ref => (this.girlList = ref)} rankFlag='2' ationTag='girl' tabLabel="女生"/>
      <RankList onRef={ref => (this.pubList = ref)} rankFlag='3' ationTag='pub' tabLabel="出版"/>
      <RankList onRef={ref => (this.comicList = ref)} rankFlag='4' ationTag='comics' tabLabel="漫画"/>
      <RankList onRef={ref => (this.audioList = ref)} rankFlag='5' ationTag='audio' tabLabel="音频"/>
      </ScrollableTabView>
      </MenuContext>
      );
  }
}

const styles = StyleSheet.create({
  title: {
    flex: 2,
    height: 48,
    backgroundColor: "#3399FF" ,
    textAlign: 'center',
    textAlignVertical:'center',
    fontSize : 18,
    color : '#ffffff'
  }
});