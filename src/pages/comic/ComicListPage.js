import React, {PureComponent} from 'react';

import {ActivityIndicator, FlatList, StyleSheet, Text, View, InteractionManager} from "react-native";
import * as Request from "../../common/request";
import * as Config from "../../common/config";
import ComicListCell from "./ComicListCell";

export default class ComicListPage extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            comicBookList: props.defaultList !== null ? props.defaultList : [],
            refreshing: false,
            pageIndex: 1,
        };
        this.renderFooter = this.renderFooter.bind(this);
        this.renderSeparator = this.renderSeparator.bind(this);
    }

    onItemPress(comicId) {

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.comicBookList}
                    renderItem={({item}) => <ComicListCell book={item}
                                                           onPress={(comicId) => this.onItemPress(comicId)}/>}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.loadListData();
                    }}
                    onEndReached={() => {
                        this.loadMoreListData();
                    }}
                    onEndThreshold={0}
                    keyExtractor={item => item.bid}
                    ListFooterComponent={this.renderFooter}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }

    loadListData() {
        console.log("start refresh");
        this.setState({
            refreshing: true,
        });
        let url = Config.api.comicColumnListUrl + 'actionId=' + this.props.actionId + '&pagestamp=1';
        if (this.props.actionTag) {
            url = url + '&actionTag=' + this.props.actionTag;
        }
        Request.get(url,
            (response) => {
                let data = response.data;
                console.log("get data:");
                let bookList = data.bookList;
                this.setState({
                    comicBookList: bookList,
                    refreshing: false,
                    pageIndex: data.pagestamp
                });
                if (this.state.comicBookList && this.props.getTagList) {
                    this.props.getTagList(data.info.actionIdList, data.info.actionTagList, this.state.comicBookList);
                }
            }, (error) => {
                console.log(error);
                this.setState({
                    refreshing: false
                });
            });
    }

    loadMoreListData() {
        console.log("start load more");
        if (this.state.pageIndex === 0) {
            return;
        }
        let url = Config.api.comicColumnListUrl + 'actionId=' + this.props.actionId + '&pagestamp=' + this.state.pageIndex;
        if (this.props.actionTag) {
            url = url + '&actionTag=' + this.props.actionTag;
        }
        this.setState({}, () => {
                Request.get(url,
                    (response) => {
                        let data = response.data;
                        let bookList = data.bookList;
                        this.setState({
                            comicBookList: this.state.comicBookList.concat(bookList),
                            pageIndex: data.pagestamp
                        });
                        if (this.state.comicBookList && this.props.getTagList) {
                            this.props.getTagList(data.info.actionIdList, data.info.actionTagList, this.state.comicBookList);
                        }
                    }, (error) => {
                        console.log(error);
                    });
            }
        );
    }

    renderFooter = () => {
        if (this.state.refreshing) {
            return null;
        }

        if (this.state.pageIndex === 0) {
            return (
                <View
                    style={{
                        paddingVertical: 20,
                        borderTopWidth: 1,
                        borderColor: "#CED0CE",
                        alignItems: 'center'
                    }}>
                    <Text>已加载全部</Text>
                </View>
            );
        } else {
            return (
                <View style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}>
                    <ActivityIndicator animating size="large"/>
                </View>
            );
        }
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 0.5,
                    width: "100%",
                    backgroundColor: "#f2f2f2"
                }}
            />
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
