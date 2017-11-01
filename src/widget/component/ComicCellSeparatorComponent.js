import React, {
	PureComponent
} from 'react';

import {
	View,
} from 'react-native';

export default class ComicCellSeparatorComponent extends PureComponent {
	render() {
        return (
        <View
            style={{
                height: 7,
                width: "100%",
                backgroundColor: "#f2f2f2"
            }}
        />
   		)
	}
}

