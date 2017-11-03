/**
 * Created by yuewen on 2017/9/6.
 */
import React, { PureComponent } from 'react'
import { View, StyleSheet, FlatList, Text, Platform } from 'react-native'
import {
	StackNavigator
} from 'react-navigation'
import screen from '../../common/screen'
import config from '../../common/config'
import ComicInfoCell from './ComicInfoCell'
import WonderfulCell from './WonderfulCell'
import ComicIntroductionCell from './ComicIntroductionCell'
import ComicCatalogueCell from './ComicCatalogueCell'
import ComicCopyRightCell from './ComicCopyRightCell'
import ComicCommonCell from './ComicCommonCell'
import ComicAdvCell from './ComicAdvCell'
import ComicScrollableBooksCell from './ComicScrollableBooksCell'
import ComicOriginalBookCell from './ComicOriginalBookCell'
import ComicBookListCell from './ComicBookListCell'
import {getComicDetailUrlByBid} from '../../common/tools'
import {getBookDetailUrlByBid} from '../../common/tools'

class ComicDetail extends PureComponent {

    state : {
        dataList : Array<Object>,
        refreshing : boolean,
        cid:string,
        type:string,
    }

    constructor(props: Object){
        super(props);
        var id=this.props.navigation.state.params.id
        this.state = {
            dataList : [],
            refreshing : false,
            cid:id,
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
//            let url="http://cartoon.reader.qq.com/v6_5_6/nativepage/cartoon/detail?comicId=7788819203465002"
//            let url="http://cartoon.reader.qq.com/v6_5_6/nativepage/cartoon/detail?comicId=7799207404128002"
//            let url=getComicDetailUrlByBid(7788819203465002)
                        let url=getComicDetailUrlByBid(this.state.cid)
            let response = await fetch(url,{
                method:"GET",
                headers:{
//'loginType':'1',
//'cookie':	'skey=Mq3jiToUaW',
//'supportmh':	'1',
//'nosid'	:'1',
//'timi'	:'1606020697',
//'gselect':	'1',
//'qimei'	:'f3b8238b9d2cf59f',
//'os':	'android',
//'supportTS':	'2',
'c_platform':	'android',
//'mversion':	'6.5.6.688',
//'ckey'	:'1000010101',
//'tinkerid':	'qqreader_6.5.6.0888_android-common-327224',
//'sid':	'150252058228180',
//'safekey':'0977FB8EB0485154F281164A0BF2C92B',
//'qqnum':	'1606020697',
//'ua':	'OnePlus5#OnePlus5#25',
//'c_version':	'qqreader_6.5.6.0888_android',
//'themeid':	'1000',
//'skey':	'Mq3jiToUaW',
//'channel': '00000',
//'Host':	'cartoon.reader.qq.com',
//'Connection':	'Keep-Alive',
                }
            })
            let json = await response.json()
            console.log('ComicDetail:', json)
            let dataList = []

            for (let i in json.data) {

                let dict = json.data[i]

                var item = new Object()
                item.module = dict.module
                item.title = dict.title
                item.subTitle = dict.subTitle
                item.data = dict.data

                dataList.push(item)
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
    _renderItem (info) {

        switch(info.item.module)
        {
            case 1: // 漫画信息
            {
                return <View>
                            <ComicInfoCell style = {styles.comicInfo}
                                            item = { info.item.data }
                                            />
                       </View>
            }
                break;
            case 2: // 精彩看点
            {
                return <View>
                            <WonderfulCell style = {styles.wonderful}
                                           item = { info.item }
                                           navigation={this.props.navigation}/>
                       </View>
            }
                break;
            case 3: // 漫画简介
            {
                return <View>
                            <ComicIntroductionCell 
                                style = {styles.introduction}
                                item = {info.item.data}
                            />
                        </View>
            }
                break;
            case 4: // 目录
            {
                return <View>
                            <ComicCatalogueCell
                                style = {styles.catalogue}
                                item = {info.item}
                            />
                        </View>
            }
                break;
            case 5: // xx(运营广告位)
            {
                return <View>
                            <ComicAdvCell
                                style = {styles.advCell}
                                item = {info.item}
                                navigation={this.props.navigation}
                            />
                        </View>
            }
                break;
            case 6: // 漫画原著
            {
                return <View>
                            <ComicOriginalBookCell
                                style = {styles.originalBook}
                                item = {info.item}
                                navigation={this.props.navigation}
                            />
                        </View>
            }
                break;
            case 7: // 同类热门漫画（书友还读过）
            {
                return <View>
                            <ComicScrollableBooksCell
                                style = {styles.scrollableCell}
                                item = {info.item}
                                navigation={this.props.navigation}
                            />
                        </View>
            }
                break;
            case 8: // 版权信息
            {
                return <View>
                            <ComicCopyRightCell
                                style = {styles.copyRight}
                                item = {info.item}
                            />
                        </View>
            }
                break;
            case 9: // 书评区
            {
                return <View>
                            <ComicCommonCell
                                style = {styles.commonCell}
                                item = {info.item}
                            />
                        </View>
            }
                break;
            case 10: // 收录了本书的书单
            {
                return <View>
                            <ComicBookListCell
                                style = {styles.bookList}
                                item = {info.item}
                            />
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

    comicInfo: {
        height: 150,
        width: screen.width,
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

//make this component available to the top
export default ComicDetail;