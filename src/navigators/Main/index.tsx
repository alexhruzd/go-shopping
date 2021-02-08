import React, {useContext} from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Settings from "../../screens/Settings";
import HomeStack from "../HomeStack";
import {ThemeModeContext} from "../../context/themeMode";
import ShopsList from "../../screens/ShopsList";

const Tab = createBottomTabNavigator();


const Main = () => {

  const {theme} = useContext(ThemeModeContext);

  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 18,
          padding: 10
        },
        activeBackgroundColor: theme.colors.active
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Shops" component={ShopsList} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default Main;