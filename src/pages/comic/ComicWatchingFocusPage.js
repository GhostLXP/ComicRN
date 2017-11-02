//漫画精彩看点详情页
import React, { PureComponent } from 'react'
import {StyleSheet, Image, Text, View, ScrollView,TouchableWithoutFeedback} from 'react-native'
import ViewPager from 'react-native-viewpager';
import screen from '../../common/screen'

export default class ComicWatchingFocusPage extends PureComponent {

    constructor(props) {
        super(props);
        var imgs=this.props.navigation.state.params.imgs
        // 用于构建DataSource对象
        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
    // 实际的DataSources存放在state中
        this.state = {
            dataSource: dataSource.cloneWithPages(imgs)
        }
    }
    onPressImg(){
         var thiz=this
         thiz.props.navigation.goBack()
    }
    _renderPage(data,pageID) {
        return (
        <TouchableWithoutFeedback onPress={()=> this.onPressImg()}>
            <Image
                source={{uri:data}}
                style={styles.page}/>
         </TouchableWithoutFeedback>
        );
    }
     /**
        dataSource: 提供页面数据,
        renderPage: 用于渲染页面视图,
        autoPlay: 为true 将自动播放,
        isLoop: 为true支持循环播放,
        locked: 为true禁止触摸滚动,
        onChangePage: 页面变化的回调,
        renderPageIndicator: 渲染自定义的 ViewPager indicator.
        */
    render() {
        var pos=this.props.navigation.state.params.pos
        return (
                <View style={styles.container}>
                       <ViewPager
                         dataSource={this.state.dataSource}
                         renderPage={this._renderPage.bind(this)}
                         initialPage={pos}
                         isLoop={false}
                         autoPlay={false}/>
                </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingTop:5,
            paddingLeft:5,
            backgroundColor:'#999999',
            paddingRight:5,
            paddingBottom:5,
        },
        page: {
            width: screen.width,//设备宽(只是一种实现，此处多余)
            flex: 1,
            height: screen.height,
            resizeMode: 'stretch'
        },
})
