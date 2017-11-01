import React, {PureComponent} from 'react';

import {StyleSheet, View} from "react-native";
import ScrollableTabView from 'react-native-scrollable-tab-view'
import ComicListPage from "./ComicListPage";
import TitleBarComponent from "../../widget/component/TitleBarComponent";

/**
 * 漫画二级栏目页
 */
export default class ComicColumnPage extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            actionTagList: [],
            selectIndex: 0,
            selectData: null,
            initTags: false,
            title: '',
        };
    }

    renderSinglePage(actionId) {
        return (
            <ComicListPage
                actionId={actionId}
                actionTag={null}
                defaultList={null}
                getTagList={(idList, tagList, selectData) => {
                    if (!this.props.initTags) {
                        // 获取title
                        if (idList && idList.length > 0) {
                            this.setTitle(idList[0].title);
                        }
                        // 获取actionTagList
                        let selectIndex = 0;
                        if (tagList) {
                            for (let i = 0; i < tagList.length; i++) {
                                if (tagList[i].isSelected) {
                                    selectIndex = i;
                                }
                            }
                        } else {
                            tagList = [];
                        }
                        this.setState({
                            actionTagList: tagList,
                            initTags: true,
                            selectIndex: selectIndex,
                            selectData: selectData,
                        })
                    }
                }}
            />
        )
    }

    renderMultiPage(actionId) {
        return (
            <ScrollableTabView initialPage={this.state.selectIndex}>
                {this.state.actionTagList.map((item, index) => {
                    return (
                        <ComicListPage
                            tabLabel={item.title}
                            actionId={actionId}
                            actionTag={item.actionTag}
                            defaultList={this.state.selectIndex === index ? this.state.selectData : null}/>
                    );
                })}
            </ScrollableTabView>
        );
    }

    setTitle(title) {
        this.titlebar.setTitle(title);
    }

    render() {
        let actionId = this.props.navigation.state.params.actionId;
        let page;
        if (this.state.actionTagList.length <= 1) {
            page = this.renderSinglePage(actionId);
        } else {
            page = this.renderMultiPage(actionId);
        }
        return (
            <View style={styles.container}>
                <TitleBarComponent
                    title=''
                    ref={(titlebar) => {
                        this.titlebar = titlebar;
                    }}/>
                {page}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});