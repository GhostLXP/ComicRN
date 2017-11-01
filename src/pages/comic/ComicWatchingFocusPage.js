//漫画精彩看点详情页
import React, { PureComponent } from 'react'
import {StyleSheet, Image, Text, View, ScrollView,TouchableWithoutFeedback} from 'react-native'
export default class ComicWatchingFocusPage extends PureComponent {

    render() {
        let item = this.props.item;
        var pos=this.props.navigation.state.params.pos
        var imgs=this.props.navigation.state.params.imgs
        console.log(imgs[0])
        return (
        <View style = {styles.container}>
            <View 
                style = {{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                }}
            >
                <Image 
                    source = {{uri: imgs[0]}}
                    style = {styles.topImage}
                >
                </Image>
                <Text style = {styles.title}>
                    {pos}
                </Text>
            </View>


            
        </View>
        );
    }
//    onPressImg(imagesData，position){
//    }
//    renderImages() {
//
//        let imagesData = this.props.item.data
//
//        let images = []
//
//        for (let i = 0; i < imagesData.length; i++) {
//            let item = imagesData[i];
//            images.push(
//            <TouchableWithoutFeedback onPress={()=> this.onPressImg(imagesData,i)}>
//                <Image key={i} source={{uri: item.img}} style={styles.image}/>
//            </TouchableWithoutFeedback>
//            );
//        }
//        return images;
//    }

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
//
//            <ScrollView
//                automaticallyAdjustContentInsets={false}
//                horizontal={true}
//                showsHorizontalScrollIndicator = {false}
//                style={[styles.scrollView, styles.horizontalScrollView]}>
//                {this.renderImages()}
//            </ScrollView>
