/**
 * 免费专区
 * @p_jwcao
 */

import React, {
  PureComponent
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

import ComicStoreSixItemComponent from '../widget/component/ComicStoreSixItemComponent'
import ComicStoreFourItemCard from '../widget/component/ComicStoreFourItemComponent';
import TitleComponent from '../widget/component/TitleComponent';

export default class ComicFreeScene extends PureComponent {


  constructor(props) {
    super(props)

    this.state = {
      //discounts: [],
      dataList: [],
      //refreshing: false,
    }

  }

  componentDidMount() {
    this.requestFree()
  }


  async requestFree() {
    console.log("start request");
    try {
      let response = await fetch("http://cartoon.reader.qq.com/v6_5_5/nativepage/cartoon/columns?pagestamp=1&pageType=1&c_platform=android")
      let json = await response.json();
      let jsonDataList = json.data.dataList;

      var sourceData = [];

      for (let i in jsonDataList) {

          
        let jsonItem = jsonDataList[i];
        
        let dataitem = new Object()
        dataitem.type = jsonItem.templateType;
        dataitem.cid = jsonItem.cid;
        dataitem.userPrefer = jsonItem.userPrefer;
        dataitem.title = jsonItem.title;
        dataitem.subTitle = jsonItem.subTitle;
        dataitem.columnIcon = jsonItem.columnIcon;
        dataitem.pushName = jsonItem.pushName;
        dataitem.qurl = jsonItem.qurl;
        dataitem.totalBooks = jsonItem.totalBooks;

        let jsonBookList = jsonItem.bookList;
        let bookList = [];
        for (let j in jsonBookList) {
          let bookJson = jsonBookList[j];
          let bookItem = new Object();
          bookItem.bid = bookJson.bid;
          bookItem.name = bookJson.name;
          bookItem.author = bookJson.author;
          bookItem.desc = bookJson.desc;
          bookItem.qurl = bookJson.qurl;
          bookItem.bookCover = bookJson.bookCover;
          bookItem.category = bookJson.category;
          if (bookItem.bookCover === "") {
            bookItem.imgurl = getComicImageURL(bookItem.bid);
          } else {
            bookItem.imgurl = bookItem.bookCover;
          }
          bookList.push(bookItem);
        }
        dataitem.bookList = bookList;
        sourceData.push(dataitem);

        console.log(dataitem)
      }

      this.setState({
        dataList: sourceData
      })

    } catch (error) {
      // this.setState({ refreshing: false })
      error.stack;
      console.log(error);
    }
  }

  renderCardItem(dataItem) {
    //暂时只展示 type=6的card

    if (dataItem.item.type == 6) {
      return (
        <ComicStoreSixItemComponent
                cardItem = {dataItem.item}
        />
      )
    } else if (dataItem.item.type == 4) {

      return(
        <View>
          <TitleComponent pictureData={dataItem.item}
          />
          <ComicStoreFourItemCard cardData={dataItem.item}
          />
        </View>
      )
    }

  }

   renderdivider() {
        return (
            <View>
             <View style={styles.divider} />
            </View>
        )
    }

  //暂时使用FlatList，以后更换其他定制list组件
  render() {
    return (
      <View style={styles.container}>
        <FlatList
         data = {this.state.dataList}
         renderItem = {this.renderCardItem}
         ItemSeparatorComponent={this.renderdivider}
        />
      </View>
    );
  }
}

/**
 * 根据bid生成漫画的书封
 * @param {*} bid 
 */
function getComicImageURL(bid) {
  return "http://public-1252317822.image.myqcloud.com/cover/" + bid + "/cover.jpg?imageView2/2/w/279/h/372"
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  divider: {
    height: 8,
    backgroundColor: '#f2f2f2',
  },
});