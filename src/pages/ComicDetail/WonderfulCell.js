/**
 * Created by yuewen on 2017/9/7.
 精彩看点
 */
import React, { PureComponent } from 'react'
import {StyleSheet, Image, Text, View, ScrollView,TouchableWithoutFeedback} from 'react-native'
export default class WonderfulCell extends PureComponent {

    render() {
        let item = this.props.item;
        console.log("WonderfulCell:",item);
        return (
        <View style = {styles.container}>
            <View 
                style = {{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                }}
            >
                <Image 
                    source = {require('../../images/comic_highlight.png')}
                    style = {styles.topImage}
                >
                </Image>
                <Text style = {styles.title}>
                    {item.title}
                </Text>
            </View>

            <ScrollView
                automaticallyAdjustContentInsets={false}
                horizontal={true}
                showsHorizontalScrollIndicator = {false}
                style={[styles.scrollView, styles.horizontalScrollView]}>
                {this.renderImages()}
            </ScrollView>
            
        </View>
        );
    }
    onPressImg(imagesData,position){
//         this.props.navigation.navigate('ComicDetail');
//         其实上面代码中的this指向的是当前函数对象，因此引用就报错。
//         this.props.navigation.navigate中的this 需要的是当前类的，因此想正确的引用当前类中this，需要将当期的this传入
         var thiz=this
         thiz.props.navigation.navigate('ComicWatchingFocusPage',{imgs:imagesData,pos:position})
    }
    renderImages() {

        let imagesData = this.props.item.data

        let images = []
        let imagesUrl=[]
        for (let i = 0; i < imagesData.length; i++) {
            let item = imagesData[i];
            imagesUrl.push(item.img);
            images.push(
            <TouchableWithoutFeedback onPress={()=> this.onPressImg(imagesUrl,i)}>
                <Image key={i} source={{uri: item.img}} style={styles.image}/>
            </TouchableWithoutFeedback>
            );
        }
        return images;
    }

}

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
    },
    title: {
        marginTop: 31,
        marginLeft: 8,
        width: 200,
        height: 30,
        backgroundColor: 'white',
        color: 'black',
        fontSize: 16,
    },

    topImage: {
        width: 46,
        height: 46,
        marginLeft: 16,
        marginTop: 16,
    },

    horizontalScrollView: {
        height: 174,
        backgroundColor: '#f3f3f3',
    },
    image: {
        marginTop: 14,
        marginLeft: 15,
        width: 110,
        height: 146,
    },

})


