import React, {Component} from 'react'
import {View, StyleSheet, Text, Image} from "react-native";

export default class TitleBarComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title ? props.title : "",
        }
    }

    setTitle(title) {
        this.setState({
            title: title,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../images/titlebar_icon_back.png')} style={styles.backImg}/>
                <Text style={styles.title}>{this.state.title}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        height: 48,
        flexDirection: 'row',
        backgroundColor: '#3399FF',
        justifyContent:'center'
    },
    title: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical:'center',
        fontSize : 18,
        color : '#ffffff'
    },
    backImg: {
        width: 48,
        height: 48,
        resizeMode: 'center',
        position: 'absolute',
        left: 0,
    }
});