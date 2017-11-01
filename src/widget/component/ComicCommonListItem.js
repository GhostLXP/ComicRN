/**
 * 人气周榜 item
 * @author zhanghonghao
 */
import React, {
    PureComponent
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity

} from 'react-native';
import Color from '../../common/color'
import Dimen from '../../common/dimension'
import screen from '../../common/screen'
import {
    getComicCoverUrlByBid
} from '../../common/tools';
export default class ComicCommonListItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            forcus: false
        };
    }

    render() {
        let {
            bookItem
        } = this.props;
        let imageurl = bookItem.imgurl;
        if (imageurl == null) {
            imageurl = getComicCoverUrlByBid(bookItem.bid, 0, 0);
        }
        return (
            <TouchableOpacity style={styles.container}>
                <Image source={{ uri: imageurl }} style={styles.comicCover} />

                <View style={styles.rightContainer}>
                    <Text style = {{fontSize:Dimen.text_size_class_4,color:Color.text_color_c101,marginTop:6}}>{bookItem.name}</Text>
                    <Text numberOfLines ={2} style = {{fontSize:Dimen.text_size_class_3,color:Color.text_color_c103,marginTop:5}}>
                        {bookItem.desc}
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop:5}}>
                        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                            <Image source={require('../../images/card_author_icon.png')} style={{width:12, height:12}}/>
                            <Text style={{fontSize:Dimen.text_size_class_2,color:Color.text_color_c103,marginLeft:2}}>
                                {bookItem.author}
                            </Text>
                        </View>
                        <Text style={styles.categoryTag}>
                            {bookItem.category}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems:'stretch',
        width:screen.width,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 12,
        borderBottomWidth: 0.5,
        borderColor: Color.border,
        backgroundColor: 'white',
    },
    comicCover: {
        width: 60,
        height: 80,
        marginTop: 10,
        borderRadius: 2,
    },
    rightContainer: {
        flex: 1,
        paddingLeft: 20,
    },
    categoryTag:{
        fontSize:Dimen.text_size_class_2,
        color:Color.text_color_c103,
        paddingLeft:2,
        paddingRight:2,
        marginRight:2,
        borderRadius:5,
        borderWidth: screen.onePixel,
        borderColor: Color.text_color_c801
    }
});