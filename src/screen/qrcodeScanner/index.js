import React, {Fragment, useEffect, useState, useContext} from 'react';
import * as Native from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {getData} from '../../utils/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GlobalContext} from '../../context';
import moment from 'moment';
import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {color} from '../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const Index = props => {
  const context = {...React.useContext(GlobalContext)};
  const [isRead, setIsRead] = useState(false);
  const cameraRef = React.useRef(null);
  useEffect(() => {
    // initialRequests();
  }, []);

  const barcodeRecognized = ({barcodes}) => {
    if (barcodes.length !== 0) {
      console.log('barcodes', barcodes);
    }
  };

  return (
    <Native.View style={{flex: 1}}>
      <Native.View style={tw`p-4`}>
        <Native.TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon name="arrow-back" size={20} color="#000" />
        </Native.TouchableOpacity>
      </Native.View>
      <RNCamera
        ref={cameraRef}
        style={{
          width: Native.Dimensions.get('screen').width,
          height: '100%',
        }}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={barcodeRecognized}
        // onBarCodeRead={onBarCodeRead}
      >
        <BarcodeMask
          width={300}
          height={300}
          edgeColor={color.primary}
          lineAnimationDuration={900}
        />
      </RNCamera>
    </Native.View>
  );
};

export default Index;
