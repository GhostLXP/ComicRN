/**
 * {Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
    Component
} from 'react';
import {
    AsyncStorage,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    InteractionManager,
    ActivityIndicator,
    RefreshControl,
    Platform,
    BackHandler,
    TouchableOpacity
} from 'react-native';
import Config from '../common/config';
import Request from '../common/request';
import ViewPager from '@tencent/react-native-viewpager';
import RecommendListComponent from '../widget/component/RecommendListComponent';
import Color from '../common/color';
import {
    StackNavigator
} from 'react-navigation'

let cacheResults = {
    items: [],
    allPage: 0,
    pagestamp: 1,
};

const BANNER_IMGS = [


];
export default class HomeScene extends Component {

    constructor(props) {
        super(props);
        let pagedataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        this.state = {
            dataList: [],
            advlist: pagedataSource.cloneWithPages(BANNER_IMGS),
            isRefreshing: false,
            isLoad: false,
            isLoadingMore: false,
        }
        this.renderRow = this.renderRow.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.renderHeader = this.renderHeader.bind(this);

    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    onBackAndroid = () => {
        let navigator = this.props.navigation;
        navigator.goBack();
        return false;
    };

    renderFooter() {

        if (!this.isMore() && !this.state.isRefreshing) {
            return (
                <View style={{height: 55, justifyContent:'center',alignItems:'center',backgroundColor:'#f2f2f2'}}>
                    <Text style= {{fontSize:14,color:Color.text_color_c103}} >已显示全部</Text>
                </View>
            )
        }

        return (
            <View style={{height: 55, justifyContent:'center',alignItems:'center',backgroundColor:'#f2f2f2'}}>
                    <Text style= {{fontSize:14,color:Color.text_color_c103}} >正在加载...</Text>
                </View>
        )
    }

    // 服务器有没有更多数据
    isMore() {
        return cacheResults.pagestamp != '0';
    }

    // 加载更多数据
    onEndReached() {
        if (!this.isMore() || this.state.isLoadingMore) {
            return;
        }
        this.loadDataFromCache(cacheResults.pagestamp)
    }

    // 下拉刷新
    onRefresh() {
        this.state.isRefreshing = true;
        cacheResults.items = []
        this.loadDataFromCache(1)
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                refreshing: true
            })
            this.loadAdFromCache()
            this.loadDataFromCache(1)
        });
    }

    loadAdFromCache() {
        let adkey = Config.api.homeAdUrl;
        AsyncStorage.getItem(adkey).then((value) => {
            if (value !== null) {
                let jsondata = JSON.parse(value);
                let contentlist = jsondata.adinfo;
                for (var i = contentlist.length - 1; i >= 0; i--) {

                    if (contentlist[i].postion == '103486') {
                        contentlist = contentlist[i].ads
                        break
                    }
                }
                let pagedataSource = new ViewPager.DataSource({
                    pageHasChanged: (p1, p2) => p1 !== p2,
                });
                let advsource = pagedataSource.cloneWithPages(contentlist)
                this.setState({
                    advlist: advsource
                })
                console.log('get ad cache success ');
                this.loadAdData(true, adkey)
            } else {
                this.loadAdData(false, adkey)
            }
        });
    }

    loadDataFromCache(pagestamp) {
        let recommendKey = Config.api.homeList + '&pagestamp=' + pagestamp;
        AsyncStorage.getItem(recommendKey).then((value) => {
            if (pagestamp != 1) {
                this.setState({
                    isLoadingMore: true
                });
            } else {
                this.setState({
                    isRefreshing: true
                });
            }
            if (value !== null) {
                if (recommendKey == 1) {
                    cacheResults.items = null
                }
                let jsondata = JSON.parse(value);
                cacheResults.pagestamp = jsondata.data.pagestamp;
                let items = cacheResults.items;
                let contentlist = jsondata.data.dataList;
                if (items == null) {
                    items = contentlist;
                } else {
                    items = items.concat(contentlist);
                }
                cacheResults.items = items;
                this.setState({
                    isRefreshing: false,
                    isLoad: true,
                    isLoadingMore: false,
                });
                console.log('get cache success ');
                this.loadData(true, pagestamp)
            } else {
                this.loadData(false, pagestamp)
            }
        });
    }

    loadAdData(hasData, adkey) {
        console.log('loadAdData');
        Request.get(adkey, (data) => {
            this._save(data, Config.api.homeAdUrl);
            if (!hasData) {
                this.loadAdFromCache(Config.api.homeAdUrl);
            }
        }, (error) => {
            console.log(error);
        });
    }

    async _save(value, key) {
        try {
            AsyncStorage.setItem(key, JSON.stringify(value));
            console.log('_save success: ');
        } catch (error) {
            console.log('_save error: ', error.message);
        }
    }

    loadData(hasData, pagestamp) {
        console.log('loadData ');
        Request.get(Config.api.homeList + '&pagestamp=' + pagestamp, (data) => {
            console.log(data);
            this._save(data, Config.api.homeList + '&pagestamp=' + pagestamp);
            if (!hasData) {
                this.loadDataFromCache(pagestamp);
            }
            setTimeout(() => {
                this.setState({
                        isLoad: true,
                        isRefreshing: false,
                        isLoadingMore: false,
                    });
            }, 0);
        }, (error) => {
            console.log(error);
        });
    }

    renderRow(rowData) {
        let navigation = this.props.navigation;
        return (
            <RecommendListComponent itemData={rowData}
                navigation = {navigation}
            />
        )
    }



    renderAdv(data: Object, pageID: number | string) {
        return (
            <Image style={styles.page} source={{ uri:data.image_url }} />
        );
    }


    renderHeader() {
        return (
            <View>
             <ViewPager
                        style={{height:130}}
                        dataSource={this.state.advlist}
                        renderPage={this.renderAdv}
                        isLoop={true}
                        autoPlay={true}/>

            </View>
        )
    }

    renderdivider() {
        return (
            <View>
             <View style={styles.divider} />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.isLoad ?
                        <FlatList
                            data={cacheResults.items}
                            renderItem={this.renderRow}
                            enableEmptySections={true}
                            ListHeaderComponent={this.renderHeader}
                            onEndReached={this.onEndReached}
                            onEndReachedThreshold={40}
                            ListFooterComponent={this.renderFooter}
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh}
                            ItemSeparatorComponent={this.renderdivider}
                        />
                        :
                        <ActivityIndicator
                            style={styles.loadDataStyle}
                        />
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    loadDataStyle: {
        marginVertical: 20
    },
    loadMoreStyle: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    page: {
        flex: 1,
        height: 185,
        resizeMode: 'stretch'
    },
    divider: {
        height: 8,
        backgroundColor: '#f2f2f2',
    },
});