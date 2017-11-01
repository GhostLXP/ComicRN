
import { PixelRatio } from 'react-native'
export function getCoverUrlByBid(bookId: number) {
	let result = 'http://wfqqreader.3g.qq.com/cover/' + bookId % 1000 + '/' + bookId + '/t5_' + bookId + '.jpg';
	return result;
}
export function getComicCoverUrlByBid(comicId: number, widthInPx: number, heightInPx: number) {
	if (comicId <= 0) {
		return "";
	}
	if (widthInPx <= 0) {
		widthInPx = 93 * PixelRatio.get()
	}
	if (heightInPx <= 0) {
		heightInPx = 142 * PixelRatio.get()
	}

	let sb = 'http://public-1252317822.image.myqcloud.com/'
	sb += 'cover/'
	sb += comicId
	sb += '/cover'
	sb += '.jpg'
	sb += '?imageView2/2/w/'
	sb += widthInPx
	sb += '/h/'
	sb += heightInPx

	return sb;

}
export function getComicDetailUrlByBid(comicId) {
    let URL_VERSION = "6_5_6";
    let DOMAINNAME_COMIC = "http://cartoon.reader.qq.com/";
//    DOMAINNAME_COMIC = "http://ptcartoon.reader.qq.com/";//测试环境
    let COMIC_DETAIL_URL = DOMAINNAME_COMIC  + "v" + URL_VERSION + "/nativepage/cartoon/detail";
    let sb=COMIC_DETAIL_URL;
	sb += "?comicId="
	sb += comicId

	return sb;

}

