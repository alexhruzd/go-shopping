import React, {useContext, useEffect} from 'react';
import Auth from "./navigators/Auth";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {AuthContext, AuthProvider} from "./context/auth";
import {combineProviders} from "react-combine-providers";
import Main from "./navigators/Main";
import {lightTheme, MyDarkTheme, MyLightTheme} from "./theme";
import {ThemeModeProvider} from "./context/themeMode";
import {ShopsProvider} from "./context/shops";
import * as Notifications from 'expo-notifications';
import {NotificationProvider} from "./context/notification";

function App() {

  const {isAuth}: any = useContext(AuthContext);

  if (!isAuth) {
    return (
      <Auth/>
    )
  }

  return (
    <Main/>
  );
}

const provider = combineProviders();
provider.push(NotificationProvider)
provider.push(AuthProvider);
provider.push(ThemeModeProvider);
provider.push(ShopsProvider);

const MasterProvider = provider.master();

function AppContainer() {
  return (
    <MasterProvider>
      <NavigationContainer theme={MyLightTheme}>
        <App/>
      </NavigationContainer>
    </MasterProvider>
  )
}

export default AppContainer;