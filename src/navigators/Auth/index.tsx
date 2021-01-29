import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import Welcome from "../../screens/Welcome";
import SignIn from "../../screens/SignIn";
import Register from "../../screens/Register";

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome" headerMode="screen">
      <Stack.Screen name="Welcome" component={Welcome}/>
      <Stack.Screen name="SingIn" component={SignIn}/>
      <Stack.Screen name="Register" component={Register}/>
    </Stack.Navigator>
  );
};

export default Auth;