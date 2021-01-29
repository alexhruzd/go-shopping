import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import Map from "../../screens/Map";
import Home from "../../screens/Home";
import CreateShop from "../../screens/CreateShop";


const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="screen">
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Map" component={Map}/>
      <Stack.Screen name="Add Shop" component={CreateShop}/>
    </Stack.Navigator>
  );
};

export default HomeStack;