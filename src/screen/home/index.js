import React, {Fragment, useEffect, useState, useContext} from 'react';
import * as Native from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {getData} from '../../utils/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Location from 'react-native-geolocation-service';
import {GlobalContext} from '../../context';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';

import IconOct from 'react-native-vector-icons/Octicons';
import {API, color} from '../../utils/colors';
import BleManager, {connect} from 'react-native-ble-manager';
import {spin} from '../../utils/spinninganimation';
import {
  BottomModal,
  HtmlView,
  Modal,
  MainSpinner,
  SpinningComponent,
} from '../../components';
import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import Toast from 'react-native-toast-message';
const BleManagerModule = Native.NativeModules.BleManager;
const bleManagerEmitter = new Native.NativeEventEmitter(BleManagerModule);

let onRead = false;
let mySound = null;
let isConnectedBeacon = false;

const Index = props => {
  var Sound = require('react-native-sound');
  const animated = new Native.Animated.Value(0);
  const context = useContext(GlobalContext);
  const [isScanning, setIsScanning] = useState(false);
  const peripherals = new Map();
  const [list, setList] = useState([]);
  const cameraRef = React.useRef(null);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);
  const [infoVisible, setInfoVisible] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isMute, setIsMutted] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );

    // initialRequests();
    BleManager.start({showAlert: false}).then(() => {
      // Success code
      console.log('Module initialized');
    });

    Native.PermissionsAndroid.request(
      Native.PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Access Required',
        message: 'This App needs to Access your location',
      },
    );
    BleManager.enableBluetooth()
      .then(() => {
        // Success code
        console.log('The bluetooth is already enabled or the user confirm');
      })
      .catch(error => {
        // Failure code
        console.log('The user refuse to enable bluetooth');
      });
    initialRequests();
  }, []);

  const handleDiscoverPeripheral = peripheral => {
    if (peripheral.id === 'CC:98:8B:B8:1C:49') {
      getContent();
    }
  };

  const getContent = (id = '632d49328775dccbeacda9ee') => {
    if (isConnectedBeacon === false) {
      isConnectedBeacon = true;
      // Toast.show({
      //   type: 'success',
      //   text1: "Beacon төхөөрөмж холбогдлоо.",
      //   topOffset: 10,
      //   visibilityTime: 3000,
      // });
      context.request({url: `content/${id}`, model: 'content'}).then(res => {
        if (res.success) {
          if (res.data.voicenm !== null && res.data.voicenm !== undefined) {
            mySound?.stop();
            onSound(res.data.voicenm);
          }
          setData(res.data);
          setInfoVisible(true);
          setIsLoading(false);
        }
        setVisible(false);
      });
    }
  };

  const initialRequests = async () => {
    const token = await getData({key: 'notftoken'});
    setToken(token);
  };

  const handleLocation = (didmount = false) => {
    if (Native.Platform.OS === 'ios') {
      return Location.requestAuthorization('whenInUse').then(permission => {
        getLocation(didmount);
      });
    }

    return Native.PermissionsAndroid.request(
      Native.PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Access Required',
        message: 'This App needs to Access your location',
      },
    ).then(permission => {
      console.log('permission: ', permission);

      setIsLoading(true);
      getLocation(didmount);
    });
  };

  const getLocation = async didmount => {
    const token = await getData({key: 'notftoken'});
    console.log('list', list);
    console.log('didmount: ', didmount);
    // setState({ isLocation: true });
    Location.getCurrentPosition(
      position => {
        console.log('token', token);
        const {latitude, longitude} = position?.coords;

        context
          .request({
            url: `content/location/${longitude}/${latitude}/${token}`,
            model: 'contentlocation',
            method: 'POST',
            body: null,
          })
          .then(res => {
            console.log('res: ', res);

            if (res.success) {
              if (res.data.voicenm !== null && res.data.voicenm !== undefined) {
                mySound?.stop();
                onSound(res.data.voicenm);
              }
              setData(res.data);
              setInfoVisible(true);
            }
            setIsLoading(false);
          });
      },
      error => {
        if (didmount) return null;

        switch (error.code) {
          case 1: // PERMISSION_DENIED-Location (permission is not granted)
            return Toast.show({
              type: 'success',
              text1: 'Тун удахгүй',
              topOffset: 10,
              visibilityTime: 3000,
            });
          case 2: // POSITION_UNAVAILABLE (Location provider not available)
            return Toast.show({
              type: 'error',
              text1: 'POSITION_UNAVAILABLE',
              topOffset: 10,
              visibilityTime: 3000,
            });
          case 3: // TIMEOUT (Location request timed out)
            return Toast.show({
              type: 'error',
              text1: 'TIMEOUT',
              topOffset: 10,
              visibilityTime: 3000,
            });
          case 4: // PLAY_SERVICE_NOT_AVAILABLE (Google play service is not installed or has an older version (android only))
            return Toast.show({
              type: 'error',
              text1: 'PLAY_SERVICE_NOT_AVAILABLE',
              topOffset: 10,
              visibilityTime: 3000,
            });
          case 5: // SETTINGS_NOT_SATISFIED (Location service is not enabled or location mode is not appropriate for the current request (android only))
            return Toast.show({
              type: 'error',
              text1: 'SETTINGS_NOT_SATISFIED',
              topOffset: 10,
              visibilityTime: 3000,
            });
          case -1: // INTERNAL_ERROR (Library crashed for some reason or the getCurrentActivity() returned null (android only))
            return Toast.show({
              type: 'error',
              text1: 'SETTINGS_NOT_SATISFIED',
              topOffset: 10,
              visibilityTime: 3000,
            });

          default:
            break;
        }
      },
      {enableHighAccuracy: true},
    );
  };

  const onSound = e => {
    if (e === null) {
      if (mySound?.isPlaying()) {
        mySound?.pause();
      } else {
        if (isStopped !== true) {
          mySound?.play();
        } else {
          mySound?.stop(() => {
            mySound?.play();
          });
        }
      }
    } else {
      const url = API + e;
      mySound = new Sound(url, null, error => {
        if (error) {
          console.log(error);
        } else {
          mySound?.play(success => {
            if (success) {
              setIsStopped(true);
            } else {
              setIsStopped(false);
            }
          });
        }
      });
    }
  };
  console.log('list', list);
  const barcodeRecognized = ({barcodes}) => {
    if (barcodes.length !== 0 && !onRead) {
      onRead = true;
      context
        .request({url: `content/${barcodes[0].data}`, model: 'content'})
        .then(res => {
          console.log('res', res);
          if (res.success) {
            if (res.data.voicenm !== null && res.data.voicenm !== undefined) {
              mySound?.stop();
              onSound(res.data.voicenm);
            }
            setData(res.data);
            setInfoVisible(true);
            // setIsLoading(false);
          }
          setVisible(false);
          onRead = false;
        });
    }
  };

  const cameraModal = () => {
    return (
      <RNCamera
        ref={cameraRef}
        style={{
          width: Native.Dimensions.get('screen').width,
          height: '85%',
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
    );
  };

  const handleBluetooth = async () => {
    setIsLoading(true);
    await BleManager.scan([], 10, true).then(() => {
      // Success code
      console.log('Scan started');
    });
  };

  return (
    <Native.ImageBackground source={require('../../assets/bg.png')} style={{ position: "absolute", zIndex: 999, width: Native.Dimensions.get("window").width, height: Native.Dimensions.get("window").height, flex: 1 }}>
      <Native.View style={tw.style(`justify-center`, {flex: 1})}>
        <MainSpinner />
        <SpinningComponent
          onClick={() => setVisible(!visible)}
          onClickBluetooth={() => handleBluetooth()}
          onClickLocation={() => handleLocation((didmount = true))}
        />
      </Native.View>

      <Modal
        isVisible={visible}
        onCancel={() => setVisible(!visible)}
        BodyComponent={
          <>
            <Native.View
              style={{
                borderBottomWidth: 1,
                borderColor: '#e3e3e3',
                paddingVertical: 15,
                paddingHorizontal: 15,
              }}>
              <Native.TouchableOpacity
                onPress={() => {
                  setVisible(!visible);
                }}>
                <Icon name="arrow-back" size={20} color="#000" />
              </Native.TouchableOpacity>
            </Native.View>
            <Native.View
              style={tw.style(``, {
                height: Native.Dimensions.get('screen').height,
              })}>
              {cameraModal()}
            </Native.View>
          </>
        }
      />

      <Modal
        isVisible={infoVisible}
        onCancel={() => {
          setInfoVisible(!infoVisible);
          isConnectedBeacon = false;
        }}
        BodyComponent={
          <>
            <Native.View
              style={tw.style(`flex-row flex-wrap justify-between`, {
                borderBottomWidth: 1,
                borderColor: '#e3e3e3',
                paddingVertical: 15,
                paddingHorizontal: 15,
              })}>
              <Native.TouchableOpacity
                onPress={() => {
                  setInfoVisible(!infoVisible);
                  isConnectedBeacon = false;
                }}>
                <Icon name="arrow-back" size={20} color="#000" />
              </Native.TouchableOpacity>
              <Native.TouchableOpacity
                onPress={() => {
                  onSound(null);
                  setIsMutted(!isMute);
                }}>
                <IconOct
                  name={isMute === true ? 'mute' : 'unmute'}
                  size={20}
                  color="#000"
                />
              </Native.TouchableOpacity>
            </Native.View>
            <Native.ScrollView
              style={tw.style(`content-center`, {
                height: Native.Dimensions.get('screen').height * 0.8,
              })}>
              <Native.View style={tw`m-3`}>
                {data && data && (
                  <>
                    <HtmlView html={data.videolink} />
                    <HtmlView html={data.description} />
                  </>
                )}
              </Native.View>
            </Native.ScrollView>
          </>
        }
      />
      {isLoading === true ? (
        <Native.View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            top: 0,
            bottom: 0,
          }}>
          <Native.View
            style={{
              backgroundColor: 'white',
              borderRadius: 30,
              padding: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.41,
              shadowRadius: 9.11,
              
              elevation: 14,
            }}>
            <Native.Image
              style={{width: 100, height: 100, resizeMode: 'contain'}}
              source={require('../../assets/rocketlaunching.gif')}
            />
          </Native.View>
        </Native.View>
      ) : null}
    </Native.ImageBackground>
  );
};

export default Index;
