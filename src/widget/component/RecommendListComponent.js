/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {
    PureComponent
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    InteractionManager
} from 'react-native';

import FreeScene from '../../scene/FreeScene'
import RankPage from '../../pages/rank/RankPage'

let {
    width,
    height
} = Dimensions.get('window');


import TitleComponent from './TitleComponent';
import EntranceGridComponent from './EntranceGridComponent';
import ComicStoreFourItemCard from './ComicStoreFourItemComponent';
import ComicStoreSixItemComponent from './ComicStoreSixItemComponent'
import ComicStoreExclusiveComponent from './ComicStoreExclusiveComponent'
import ComicStoreFreeComponent from './ComicStoreFreeComponent'
import ComicStoreStripItemComponent from './ComicStoreStripItemComponent'
import ComicStoreWeeklyRankComponent from './ComicStoreWeeklyRankComponent'
import ComicColumnPage from "../../pages/comic/ComicColumnPage";
export default class listItem extends PureComponent {
    picturePress(comicid) {

    }

    entrancePress(index) {
        let navigator  = this.props.navigation;
        if (navigator) {
            if (index < 2) {
                navigator.navigate('RankPage')
            } else {
                navigator.navigate('FreeScene')
            }
        }
    }

    morePress(actionId) {
        let navigator = this.props.navigation;
        if (navigator) {
            console.log("press me -- " + actionId);
            navigator.navigate('ComicColumnPage', {
                actionId: actionId,
            });
        }
    }

    renderItem() {
        let {
            itemData
        } = this.props

        if (itemData.item.templateType == '0') {
            return (
                <View>

                    <EntranceGridComponent 
                            infos={itemData.item.adList}
                            entrancePress={(index) => this.entrancePress(index)}
                    />
                    </View>
            )
        } else if (itemData.item.templateType == '1') {
            return (
                <View>
                        <ComicStoreExclusiveComponent
                                    cardData={itemData.item}
                        /> 
                    </View>
            )
        } else
        if (itemData.item.templateType == '4') {
            return (
                <View>
                        <TitleComponent pictureData={itemData.item}
                        />
                        <ComicStoreFourItemCard cardData={itemData.item}

                                                navigation = {this.props.navigation}

                                                morePress={(actionId) => this.morePress(actionId)}

                        />
                    </View>
            )
        } else if (itemData.item.templateType == '6') {
            return (
                <View>
                        <ComicStoreSixItemComponent
                            cardItem={itemData.item}
                            picturePress={() => this.picturePress(comicid)}
                            morePress={(actionId) => this.morePress(actionId)}
                        />
                    </View>
            )
        } else if (itemData.item.templateType == '13') {
            return (
                <View>
                    <TitleComponent pictureData={itemData.item}
                    />
                    <ComicStoreFreeComponent cardItem={itemData.item}
                                             picturePress={() => this.picturePress(comicid)}
                    />
                </View>
            )
        } else if (itemData.item.templateType == '3') {
            return (
                <View>
                    <TitleComponent pictureData={itemData.item}
                    />
                    <ComicStoreStripItemComponent cardItem={itemData.item}
                                             picturePress={() => this.picturePress(comicid)}
                    />
                </View>
            )
        } else if (itemData.item.templateType == '10') {
            return (
                <View>
                    <TitleComponent pictureData={itemData.item}
                    />
                    <ComicStoreWeeklyRankComponent cardItem={itemData.item}
                                                  picturePress={() => this.picturePress(comicid)}
                    />
                </View>
            )
        } else {
            return (
                <View>
                        <TitleComponent pictureData={itemData.item}
                        />
                    </View>
            )
        }

    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderItem()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: 'white',
    },
    placeViewStyle: {
        backgroundColor: '#ddd',
        height: 10,
    },
});