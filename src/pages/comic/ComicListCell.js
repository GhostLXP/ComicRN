import React, {PureComponent} from 'react';

import {Image, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {getComicCoverUrlByBid} from "../../common/tools";

export default class ComicListCell extends PureComponent {
    render() {
        let {book} = this.props;
        let imageUrl = getComicCoverUrlByBid(book.bid);
        return (
            <TouchableOpacity onPress={() => this.props.onPress(book.bid)} style={styles.root}>
                <Image source={{ uri: imageUrl }} style={styles.cover} />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{book.name}</Text>
                    <Text numberOfLines={2} style={styles.intro}>{book.intro}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                            <Image source={require('../../images/card_author_icon.png')} style={styles.authorimg}/>
                            <Text style={styles.author}>{book.author}</Text>
                        </View>
                        <Text style={styles.catel3name}>{book.category}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );

    }
}

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop:14,
        paddingBottom:14
    },
    cover: {
        width: 50,
        height: 67,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightContainer: {
        flex: 1,
        paddingLeft: 12,
        flexDirection: 'column'
    },
    title: {
        fontSize : 16,
        color : '#141414'
    },
    intro: {
        fontSize : 14,
        color : '#999999'
    },
    author: {
        fontSize : 12,
        color : '#999999'
    },
    authorimg: {
        width: 12,
        height: 12
    },
    catel3name: {
        fontSize : 10,
        color : '#99664b',
        textAlign:'center',
        borderColor: '#99664b',
        borderWidth: 0.5,
        justifyContent: 'flex-end'
    }
});