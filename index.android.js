//
import React, {
	PureComponent
} from 'react';
import {
	AppRegistry,
	Platform,
	BackAndroid
} from 'react-native';
import {
	StackNavigator
} from 'react-navigation'

import ComicDetail from './src/pages/ComicDetail/ComicDetail'
import ComicWatchingFocusPage from './src/pages/comic/ComicWatchingFocusPage'


//导航路由表注册
const App = StackNavigator({
    ComicDetail: {
        screen: ComicDetail
    },
    ComicWatchingFocusPage: {
        screen: ComicWatchingFocusPage
    },
}, {
    initialRouteName: 'ComicDetail',
    headerMode: 'none'
});

AppRegistry.registerComponent('HelloWorld', () => App);

//import React, {Component} from "react";
//import {AppRegistry} from "react-native";
//import ComicDetail from './src/pages/ComicDetail/ComicDetail'
//AppRegistry.registerComponent('HelloWorld', ()=>ComicDetail);