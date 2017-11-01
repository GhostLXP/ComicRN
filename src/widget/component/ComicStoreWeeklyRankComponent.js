import React, { PureComponent } from 'react';
import {
    View,
    FlatList,
} from 'react-native';
import ComicCommonListItem from './ComicCommonListItem'

export default class ComicStoreWeeklyRankComponent extends PureComponent{

    render(){

        let { cardItem } = this.props;

        return (
            <View style={{flexDirection: 'column'}}>

                <FlatList
                    data={cardItem.bookList}
                    renderItem={({item}) => <ComicCommonListItem bookItem={item}/>}
                />
            </View>
        );
    }
}