import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GlobalProvider} from './src/context';
import {
  backgroundThread,
  getFcmToken,
  receiveBackgroundNotification,
  receiveNotificationFromQuitState,
  requestUserPermission,
  subscribeTopicToGetNotification,
  unsubscribeDeviceTopic,
} from './src/services/PushNotification';

import App from './src';

const MainContainer = () => {
  useEffect(() => {
    if (requestUserPermission()) {
      getFcmToken();
    } else {
      console.log('Not Authorization status:', authStatus);
    }
    receiveNotificationFromQuitState();
    receiveBackgroundNotification();
    backgroundThread();
    subscribeTopicToGetNotification();

    return () => {
      unsubscribeDeviceTopic;
      // messaging().unsubscribeFromTopic(TOPIC);
    };
  }, []);

  return (
    <NavigationContainer>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </NavigationContainer>
  );
};

export default MainContainer;
