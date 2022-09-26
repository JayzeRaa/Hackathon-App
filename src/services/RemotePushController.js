import React, {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import {LocalNotification} from './LocalPushController';
const RemotePushController = () => {
  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('REMOTE NOTIFICATION ==>', notification);
        // process the notification here
      },
      senderID: '256218572662',
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    PushNotification.requestPermissions();
  }, []);

  return null;
};

export default RemotePushController;
