/**
 * 免费中普通的书籍样式
 * @author p_jwcao
 */
import React, {
    PureComponent
} from 'react';
import {

    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity

} from 'react-native';
import Color from '../../common/color'
import Dimen from '../../common/dimension'
import {
    getComicCoverUrlByBid
} from '../../common/tools';
export default class ComicStoreBookComponent extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            forcus: false
        };
    }
    _onForcus() {
        this.setState({
            forcus: true
        });
        console.log('onForcus');
    }
    _onUnForcus() {
        this.setState({
            forcus: false
        });
        console.log('unForcus');
    }

    render() {

        let {
            bookItem
        } = this.props;
        let imageurl = bookItem.imgurl;
        if (imageurl == null) {
            imageurl = getComicCoverUrlByBid(bookItem.bid, 0, 0);
        }
        let {imageWidth} = this.props;
        if(imageWidth == null){
            imageWidth = this.props.totalWidth;
        }
        let {imageHeight} = this.props;
        if(imageHeight == null){
            imageHeight = 124;
        }

        return (
            <View style = {{flexDirection:'column',width: this.props.totalWidth} }>

                <View style={{width: imageWidth, height: imageHeight}}>
                    <Image  style={{width: imageWidth, height: imageHeight}}
                        source={{uri:imageurl}}
                    />
                    <TouchableHighlight
                        activeOpacity ={1}
                        underlayColor={'#00000050'}
                        style={styles.maskUnForcus}
                        onPress={() => {this.onBookClicked(bookItem.qurl)}}>
                        <View/>
                    </TouchableHighlight>
                </View>
                
                <Text style = {{fontSize:Dimen.text_size_class_3,color:Color.text_color_c101,marginTop:6}}
                    numberOfLines ={1}
                    ellipsizeMode='tail'>
                    {bookItem.name}
                </Text>
                <Text numberOfLines ={1} style = {{fontSize:Dimen.text_size_class_2,color:Color.text_color_c103,marginTop:5}}>
                    {bookItem.desc}
                </Text>
            </View>

        );
    }

    onBookClicked(qurl) {
        console.log('click book, qurl: ' + qurl)
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    maskForcus: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 93,
        height: 124,
        backgroundColor: '#00000050'
    },
    maskUnForcus: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 93,
        height: 124,
        backgroundColor: '#00000000'
    }

})