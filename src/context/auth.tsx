import React, {createContext, useEffect, useState} from "react";
import {AsyncStorage} from "react-native";

export const AuthContext = createContext<{
  signIn?: any,
  signUp?: any,
  signOut?: any,
  isAuth?: any,
  userAuth?: any,
}>({});


export const AuthProvider = ({children}: any) => {

  const [isAuth, setAuth] = useState(false);
  const [userAuth, setUserAuth] = useState("");

  useEffect(() => {

    (async () => {
      //await AsyncStorage.clear();

      let curAuth = await AsyncStorage.getItem("auth");

      if (curAuth) {
        setAuth(true);
        setUserAuth(curAuth);
      }

    })();
  }, [])

  const signIn = async ({login, password}: any) => {
    try {
      let userIs = await AsyncStorage.getItem(login);
      if (userIs === null) {
        throw new Error("User not found!");
      }

      let user = JSON.parse(userIs);
      if (user.password !== password) {
        throw new Error("Password is incorrect!");
      }

      await AsyncStorage.setItem("auth", login);
      setAuth(true);
      setUserAuth(login);
    } catch (e) {
      throw e;
    }
  }

  const signOut = async () => {
    await AsyncStorage.removeItem("auth");

    setAuth(false);
    setUserAuth("");
  }

  const signUp = async ({login, name, password}: any) => {
    try {
      let userIs = await AsyncStorage.getItem(login);
      if (userIs === null) {
        await AsyncStorage.setItem(login, JSON.stringify({name, password}));
        await AsyncStorage.setItem("auth", login);
        setAuth(true);
        setUserAuth(login);
      } else {
        throw new Error("This user is registered");
      }

    } catch (e) {
      throw e;
    }
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      signUp,
      signOut,
      isAuth,
      userAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
}

