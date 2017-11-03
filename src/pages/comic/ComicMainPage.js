//漫画目录
import React, {
	PureComponent
} from 'react';

import {
	Text,
	View,
	Image,
	FlatList,
	StyleSheet,
	TouchableHighlight,
	ToastAndroid,
    Platform,
    AlertIOS,
} from 'react-native';

import Color from '../../common/color'
import screen from '../../common/screen'
import ComicCellSeparatorComponent from '../../widget/component/ComicCellSeparatorComponent'
export default class ComicMainPage extends PureComponent {
	 state : {
            dataList : Array<Object>,
            refreshing : boolean,
        }

        constructor(props: Object){
            super(props);
            this.state = {
                dataList : [],
                refreshing : false,
            }

            { (this : any).requestData = this.requestData.bind(this) }

        }
        componentDidMount() {
            this.requestData()
        }

        requestData() {

            this.setState({ refreshing : true })
            this.requestList()
        }

        async requestList() {
            try {
                let url="http://cartoon.reader.qq.com/v6_5_6/nativepage/cartoon/columns?pagestamp=1&pageType=0"
                let response = await fetch(url,{
                    method:"GET",
                    headers:{
//    'loginType':'1',
//    'cookie':	'skey=Mq3jiToUaW',
//    'supportmh':	'1',
//    'nosid'	:'1',
//    'timi'	:'1606020697',
//    'gselect':	'1',
//    'qimei'	:'f3b8238b9d2cf59f',
//    'os':	'android',
//    'supportTS':	'2',
    'c_platform':	'android',
//    'mversion':	'6.5.6.688',
//    'ckey'	:'1000010101',
//    'tinkerid':	'qqreader_6.5.6.0888_android-common-327224',
//    'sid':	'150252058228180',
//    'safekey':'0977FB8EB0485154F281164A0BF2C92B',
//    'qqnum':	'1606020697',
//    'ua':	'OnePlus5#OnePlus5#25',
//    'c_version':	'qqreader_6.5.6.0888_android',
//    'themeid':	'1000',
//    'skey':	'Mq3jiToUaW',
//    'channel': '00000',
//    'Host':	'cartoon.reader.qq.com',
//    'Connection':	'Keep-Alive',
                    }
                })
                let json = await response.json()
                console.log('ComicMainPage:', json)
                let dataList = []

                for (let i in json.data.dataList) {

                    let dict = json.data.dataList[i]
                    var item = new Object()
                    if(dict.templateType==4){
                    item.templateType = dict.templateType
                    item.data = dict.bookList
                    dataList.push(item)
                     console.log('11:', item)
                    }

                }

                this.setState({
                    dataList: dataList,
                    refreshing: false,
                })


            } catch( error ){
                this.setState( {refreshing : false} )
            }

        }
        _onRefresh(){
            this.componentDidMount()
        }

        onPressImg(cid){
        var thiz=this
        thiz.props.navigation.navigate('ComicDetail',{id:cid})
        }
        _renderItem (info) {

            switch(info.item.templateType)
            {
                case 0: // 横4：书库 榜单 免费 包月
                {
                    return <View>
                           </View>
                }
                    break;
                case 1: // 一
                {
                    return <View>
                           </View>
                }
                    break;
                case 2:
                {
                    return <View>
                            </View>
                }
                    break;
                case 3: //三
                {
                    return <View>
                            </View>
                }
                    break;
                case 4: // 横2两排
                {
                    return <View style={{justifyContent: 'center', alignItems: 'center',}}>
                    <TouchableHighlight  onPress={()=> this.onPressImg(info.item.data[0].bid)} activeOpacity ={0.5} underlayColor={"#e3e4e5"} >
                            <Image style={{width:screen.width,height:150,paddingLeft:15,paddingRight:15}}
                              source={{ uri :info.item.data[0].bookCover }}
                               resizeMode={Image.resizeMode.stretch}>
                            </Image>
                    </TouchableHighlight>
                            <Text
                                  style={styles.name}
                                  numberOfLines ={1}
                                  ellipsizeMode='tail'
                                  >
                                  {info.item.data[0].name}
                            </Text>
                            <Text
                                  style={styles.content}
                                  numberOfLines ={1}
                                  ellipsizeMode='tail'
                                  >
                                  {info.item.data[0].author}
                            </Text>
                            <ComicCellSeparatorComponent />
                    <TouchableHighlight  onPress={()=> this.onPressImg(info.item.data[1].bid)} activeOpacity ={0.5} underlayColor={"#e3e4e5"} >
                            <Image style={{width:screen.width,height:150,paddingLeft:15,paddingRight:15}}
                                  source={{ uri :info.item.data[1].bookCover }}
                                  resizeMode={Image.resizeMode.stretch}>
                            </Image>
                    </TouchableHighlight>
                            <Text
                                  style={styles.name}
                                  numberOfLines ={1}
                                  ellipsizeMode='tail'
                                   >
                                    {info.item.data[1].name}
                            </Text>
                            <Text
                                  style={styles.content}
                                  numberOfLines ={1}
                                  ellipsizeMode='tail'
                                  >
                                    {info.item.data[1].author}
                            </Text>
                            <ComicCellSeparatorComponent />
                            <TouchableHighlight  onPress={()=> this.onPressImg(info.item.data[2].bid)} activeOpacity ={0.5} underlayColor={"#e3e4e5"} >
                            <Image style={{width:screen.width,height:150,paddingLeft:15,paddingRight:15}}
                                  source={{ uri :info.item.data[2].bookCover }}
                                  resizeMode={Image.resizeMode.stretch}>
                            </Image>
                            </TouchableHighlight>
                            <Text
                                  style={styles.name}
                                  numberOfLines ={1}
                                  ellipsizeMode='tail'
                                  >
                                   {info.item.data[2].name}
                            </Text>
                            <Text
                                style={styles.content}
                                numberOfLines ={1}
                                ellipsizeMode='tail'
                                >
                                 {info.item.data[2].author}
                            </Text>
                            <ComicCellSeparatorComponent />
                        </View>
                }
                    break;
                case 5:
                {
                    return <View>
                            </View>
                }
                    break;
                case 6: // 横3两排
                {
                    return <View>
                            </View>
                }
                    break;
                default:
                    break;
            }

        }

        // keyExtractor(item) {
        //     return item.module
        // }

        render() {

            return (
            <View style={styles.container}>

                <FlatList
                    data = { this.state.dataList }
                    onRefresh = { this.requestData }
                    refreshing = { this.state.refreshing }
                    showsVerticalScrollIndicator ={false}
                    // keyExtractor = { this.keyExtractor }
                    onRefresh={this._onRefresh.bind(this)}
                    renderItem = { this._renderItem.bind(this) }
                />
            </View>
            );
        }
    }


    // define your styles
    const styles = StyleSheet.create({
        container : {
            flex : 1,
            backgroundColor: 'white'
        },

        fourItemCard: {
            width: screen.width,
        },
        name:{
            backgroundColor:'transparent',
            color:Color.text_color_c101,
            fontSize:14,
        },
        content:{
            backgroundColor:'transparent',
            color:Color.text_color_c103,
            fontSize:12,
        },
        wonderful: {
            height: 150,
            width: screen.width,
        },

        introduction: {
            height: 100,
            width: screen.width,
        },

        catalogue: {
            height: 50,
            width: screen.width,
        },

        scrollableCell: {
            width: screen.width,
        },
        copyRight: {
            width: screen.width,
        },
        commonCell: {
            width: screen.width,
        },
        advCell: {
            width: screen.width,
        },
        originalBook: {
            width: screen.width,
        },
        bookList: {
            width: screen.width,
        },
    });
