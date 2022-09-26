import React, {useContext, useEffect} from 'react';
import * as Native from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {GlobalContext} from '../src/context';
import {Home, Onboarding, QrCodeScanner} from './screen';
import {getData} from './utils/functions';
import Toast from 'react-native-toast-message';
import tw from 'tailwind-react-native-classnames';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {CreateChannel} from './services/LocalPushController';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import 'react-native-reanimated';
const App = () => {
  const context = useContext(GlobalContext);

  PushNotification.configure({
    onNotification: function (notification) {
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    onAction: function (aa, bbb) {},
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });

  useEffect(() => {
    CreateChannel();
    async function checkRoutes() {

    }

    checkRoutes();
  }, []);

  const toastConfig = {
    success: ({text1}) => (
      <Native.View style={styles.toastContainer}>
        <Native.View
          style={tw.style(`flex-row flex-wrap items-center`, {
            backgroundColor: 'white',
            borderRadius: 10,
          })}>
          <Native.View
            style={tw.style(`justify-center items-center content-center p-3`, {
              backgroundColor: 'rgba(243, 250, 235, 1)',
              borderLeftWidth: 6,
              paddingVertical: 10,
              borderColor: 'rgba(153, 213, 87, 1)',
              width: '15%',
              height: '100%',
            })}>
            <Native.Image
              source={require('./assets/correctcircle.png')}
              style={tw.style(``, {
                width: 30,
                height: 30,
                justifyContent: 'center',
                resizeMode: 'contain',
              })}
            />
          </Native.View>
          <Native.View
            style={tw.style(``, {
              width: '75%',
              paddingLeft: 15,
              paddingVertical: 10,
            })}>
            <Native.Text style={{fontWeight: 'bold'}}>Амжилттай</Native.Text>
            <Native.Text>{text1}</Native.Text>
          </Native.View>
        </Native.View>
      </Native.View>
    ),
    error: ({text1}) => (
      <Native.View style={styles.toastContainer}>
        <Native.View
          style={tw.style(`flex-row flex-wrap items-center`, {
            backgroundColor: 'white',
            borderRadius: 10,
          })}>
          <Native.View
            style={tw.style(`justify-center items-center content-center p-3`, {
              backgroundColor: '#FFEBEB',
              borderLeftWidth: 6,
              paddingVertical: 10,
              borderColor: '#FA3B37',
              width: '15%',
              height: '100%',
            })}>
            <Native.Image
              source={require('./assets/XCircle.png')}
              style={tw.style(``, {
                width: 30,
                height: 30,
                justifyContent: 'center',
                tintColor: '#FA3B37',
                resizeMode: 'contain',
              })}
            />
          </Native.View>
          <Native.View
            style={tw.style(``, {
              width: '75%',
              paddingLeft: 15,
              paddingVertical: 10,
            })}>
            <Native.Text style={{fontWeight: 'bold'}}>Амжилтгүй</Native.Text>
            <Native.Text>{text1}</Native.Text>
          </Native.View>
        </Native.View>
      </Native.View>
    ),
  };

  const didMount = React.useRef(true);
  const Stack = createStackNavigator();
  const screenOptions = {screenOptions: {headerShown: false}};
  Native.LogBox.ignoreAllLogs();

  React.useEffect(() => {
    // const userid = await getData('userid');
    // console.log('userid: ', userid);
  });

  return (
    // <WithSplashScreen isAppReady={true}>
      <GestureHandlerRootView style={{flex: 1}}>
          <Stack.Navigator {...screenOptions} initialRouteName="Onboarding">
          <Stack.Screen name="Onboarding" component={Onboarding} />

            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="qrCodeScanner" component={QrCodeScanner}/>
          </Stack.Navigator>
          
          <Toast config={toastConfig} />
      </GestureHandlerRootView>
    // </WithSplashScreen>
  );
};

const styles = Native.StyleSheet.create({
  toastContainer: {
    marginTop: Native.Platform.OS === 'ios' ? 50 : 0,
    width: '90%',
    display: 'flex',
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: '#e3e3e3',
    zIndex: 99999,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

export default App;
