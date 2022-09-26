import {storeData} from '../utils/functions';
import PushNotification, {Importance} from 'react-native-push-notification';

export const LocalNotification = ({title, message, data}) => {
  console.log('message: ', message);
  PushNotification.localNotification({
    actions: 'test',
    channelId: 'channel-id',
    autoCancel: true,
    bigText: message,
    title: title,
    message: message,
    vibrate: true,
    data: data,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    onlyAlertOnce: true,
    actions: '',
  });
};

export const ScheduledLocalNotification = () => {
  PushNotification.localNotificationSchedule({
    autoCancel: true,
    bigText:
      'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: 'Local Notification Demo',
    title: 'Scheduled Notification Title',
    message: 'Scheduled Notification Message',
    vibrate: true,
    vibration: 500,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
    date: new Date(Date.now() + 3 * 1000), // in 3 secs
  });
};

export const CreateChannel = () => {
  PushNotification.createChannel(
    {
      channelId: 'channel-id', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
};
