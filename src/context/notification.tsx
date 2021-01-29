import React, {createContext, useEffect, useRef, useState} from "react";
import * as Notifications from "expo-notifications";

export const NotificationContext = createContext<{
  sendPushNotification?: any,
  notification?: any,
}>({});

export const NotificationProvider = ({children}: any) => {
  const [expoToken, setExpoToken] = useState<string | undefined>('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();


  useEffect(() => {
    registerForPushNotification().then(token => setExpoToken(token))

    // This listener is fired whenever a notification is received while the app is foregrounded
    // @ts-ignore
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      // @ts-ignore
      setNotification(notification);
      console.log(notification)
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    // @ts-ignore
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      // @ts-ignore
      Notifications.removeNotificationSubscription(notificationListener);
      // @ts-ignore
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, [])

  const registerForPushNotification = async () => {
    let token: string;
    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus != 'granted') {
      const {status} = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;

    return token;
  }

  const sendPushNotification = async () => {
    const message = {
      to: expoToken,
      sound: 'default',
      title: 'Hello',
      body: 'Alex!',
      data: {someData: 'goes here'},
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

  }

  return (
    <NotificationContext.Provider value={{
      sendPushNotification,
      notification
    }}>
      {children}
    </NotificationContext.Provider>
  );
}