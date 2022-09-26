import messaging from '@react-native-firebase/messaging';
import {LocalNotification} from '../services/LocalPushController';
import { storeData } from '../utils/functions';
const TOPIC = 'Notification';

export const requestUserPermission = async () => {
  //On ios,checking permission before sending and receiving messages
  const authStatus = await messaging().requestPermission();
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
};
export const getFcmToken = () => {
  // Returns an FCM token for this device
  messaging()
    .getToken()
    .then(fcmToken => {
      console.log("fcmtoken", fcmToken)
      storeData({value: fcmToken, key: 'notftoken'});
    });
};
export const receiveNotificationFromQuitState = () => {
  messaging()
    .getInitialNotification()
    .then(async remoteMessage => {
      if (remoteMessage) {
        showToast({...remoteMessage});
      }
    });
};
export const receiveBackgroundNotification = () => {
  messaging().onNotificationOpenedApp(async remoteMessage => {
    if (remoteMessage) {
      showToast({...remoteMessage});
    }
  });
};
//stop listening for new messages.
export const unsubscribeDeviceTopic = messaging().onMessage(
  async remoteMessage => {
    //ScheduledLocalNotification();
    showToast({...remoteMessage});
  },
);
export const backgroundThread = () => {
  //It's called when the app is in the background or terminated
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    showToast({...remoteMessage});
  });
};
export const subscribeTopicToGetNotification = () => {
  /**
   * based on Topic, FCM server to send targeted
   * messages to only those devices subscribed to that topic
   */
  messaging()
    .subscribeToTopic(TOPIC)
    .then(() => {
      console.log(`Topic: ${TOPIC} Suscribed`);
    });
};

const showToast = message => {
  if (message && message.notification && message.data) {
    if (message.notification.title && message.notification.body) {
      LocalNotification({
        title: message.notification.title,
        message: message.notification.body,
        data: message.data,
      });
    }
  }
  //if (Platform.OS == 'ios') {
  //  ScheduledLocalNotification(
  //   message.notification.body,
  //   message.notification.title,
  // );
  //} else {
  //  ToastAndroid.show(message, ToastAndroid.SHORT);
  //}
};
