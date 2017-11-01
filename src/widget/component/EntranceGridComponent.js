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
    Dimensions
} from 'react-native';


import EntranceGridItem from './EntranceGridItem';

export default class entranceGridView extends PureComponent {
    static defaultProps = {
        infos: [],
        entrancePress: null,
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.infos.map((info, index) => (
                    <EntranceGridItem
                        info={info}
                        key={index}
                        onPress={() => this.props.entrancePress(index)} />
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});