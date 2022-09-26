/**
 * @author [batgerelt.b]
 * @email [batgereltb@gmail.com]
 * @create date 2021-11-04 17:41
 * @modify date 2022-02-25 14:48
 * @desc []
 */
import React, {memo} from 'react';
import * as Native from 'react-native';
import HTMLView from 'react-native-htmlview';
import WebView from 'react-native-webview';

export type Props = {
  html: string;
  width?: number;
};

const Index: React.FC<Props> = ({html, width}) => {
  const _width = width || Native.Dimensions.get('window').width;

  const renderNode = (node, index) => {
    if (node.name == 'iframe') {
      const a = node.attribs;
      const iframeHtml = `<iframe src="${a.src}" width="100%" height="100%"></iframe>`;

      return (
        <Native.View
          key={index}
          style={{
            width: _width - 40,
            minHeight: Native.Dimensions.get('window').height * 0.4,
          }}>
          <WebView source={{html: iframeHtml}} />
        </Native.View>
      );
    } else if (node.name === 'img') {
      const {src} = node.attribs;
      console.log('src: ', src);

      const iframeHtml = `<img src="${src}" width="100%" height="auto"></img>`;


      return (
        <Native.View
          key={index}
          style={{
            width: _width - 40,
            minHeight: Native.Dimensions.get('window').height * 0.3,
          }}>
          <WebView source={{html: iframeHtml}} />
        </Native.View>
      );
    }
  };

  return <HTMLView value={html} renderNode={renderNode} />;
};

export default memo(Index);
