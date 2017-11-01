/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict'


const Request = {
    get: (url, successCallBack, failCallBack) => {
        console.log(url);
        return fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'supportmh': '1',
                    'nosid': '1',
                    'timi': '460352608',
                    'gselect': 'gselect',
                    'qimei': '862788033031391',
                    'os': 'android',
                    'mversion': '6.5.2',
                    'sid': '1502955447209742',
                    'safekey': '21E6D6F2634AEF35C3F75CB49C2AEF49',
                    'Content-Type': 'application/json',
                    'c_version': 'qqreader_6.5.2.0999_android',
                    'c_platform': 'android',
                    'supportTS': '1',
                    'ua': 'VTR-AL00#HWVTR#24',
                    'channel': '00000',
                    'themeid': '1000',
                    'type': '100100_0;100101_0;100111_0;102438_0;102425_0;102597_0;102603_0;102674_0;100126_0;103170_0;102542_0;102857_0;103490_0;102870_0;102879_0;103010_0;103127_0;103240_0;103239_0;103242_0;102925_0;102668_0;103096_0;103100_0;103117_0;103118_0;103187_0;103172_0;103173_0;103180_0;103182_0;103183_0;103185_0;103190_0;103191_0;103469_0;103484_0;103486_0;103520_0;103521_0;',
                    'resolution': '1080*1920',
                    'density': '3.0',
                },
                body: JSON.stringify({
                    firstParam: 'yourValue',
                    secondParam: 'yourOtherValue',
                })
            })
            .then((response) => response.json())
            .then((response) => {
                successCallBack(response);
            })
            .catch((error) => {
                failCallBack(error);
            });
    }
};

module.exports = Request;