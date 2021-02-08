import React, {useContext, useEffect} from 'react';
import Auth from "./navigators/Auth";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {AuthContext, AuthProvider} from "./context/auth";
import {combineProviders} from "react-combine-providers";
import Main from "./navigators/Main";
import {ThemeModeContext, ThemeModeProvider} from "./context/themeMode";
import {ShopsProvider} from "./context/shops";
import {NotificationProvider} from "./context/notification";

import * as TaskManager from 'expo-task-manager';
import {TypeTask} from "./common/types";

function App() {

  const {isAuth}: any = useContext(AuthContext);
  const {theme} = useContext(ThemeModeContext);


  if (!isAuth) {
    return (
      <NavigationContainer theme={theme}>
        <Auth/>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer theme={theme}>
      <Main/>
    </NavigationContainer>
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
      <App/>
    </MasterProvider>
  )
}

export default AppContainer;