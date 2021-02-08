import React, {createContext, useEffect, useRef, useState} from "react";
import * as Notifications from "expo-notifications";
import {AsyncStorage} from "react-native";
import { LocationGeofencingEventType } from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import {TypeTask} from "../common/types";

export const NotificationContext = createContext<{
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
      console.log("foreground", notification)
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    // @ts-ignore
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("clock on push", response);
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
    await AsyncStorage.setItem("push_token", token);

    return token;
  }

  return (
    <NotificationContext.Provider value={{
      notification
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

const sendPushNotification = async (id: string) => {
  let token = await AsyncStorage.getItem("push_token");

  const message = {
    to: token,
    sound: 'default',
    title: 'Go shopping!',
    body: 'Shop is near!!!',
    data: {id: id},
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

TaskManager.defineTask(TypeTask.GEOFENCING_TASK, async ({ data: { eventType, region }, error }: any) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  if (eventType === LocationGeofencingEventType.Enter) {
    console.log("You've entered region:", region);
    await sendPushNotification(region.identifier);
  }
});