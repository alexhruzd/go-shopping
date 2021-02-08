import React, {createContext, useContext, useEffect, useState} from "react";
import {AuthContext} from "./auth";
import {AsyncStorage} from "react-native";
import {Shop, TypeTask} from "../common/types";
import * as Location from 'expo-location';

export const ShopsContext = createContext<{
  shops?: any,
  addShop?: any,
  addLike?: any,
}>({});

export const ShopsProvider = ({children}: any) => {
  const {userAuth} = useContext(AuthContext);

  const [shops, setShops] = useState<Shop[]>([]);
  const [currentUser, setCurrentUser] = useState({});

  const setGeofencingShops = async (shops: any) => {
    let regions = shops
      ? shops.reduce((arr: any ,shop: Shop) => {
        if (shop.like) {
          arr.push({
            identifier: shop.id,
            latitude: shop.coords?.latitude,
            longitude: shop.coords?.longitude,
            radius: 500,
            notifyOnExit: false
          });
        }
        return arr;
      }, [])
      : null;

    if (regions) {
      const {status} = await Location.requestPermissionsAsync();
      if (status === 'granted') {
        await Location.startGeofencingAsync(TypeTask.GEOFENCING_TASK, regions);
      }
    }
  }

  useEffect(() => {
    (async () => {
      let userIs = await AsyncStorage.getItem(userAuth);
      if (userIs !== null) {
        let user = JSON.parse(userIs);
        setCurrentUser(user)
        setShops(user.shops || []);

        await setGeofencingShops(user.shops);
      }
    })();
  }, [userAuth])



  const addShop = async (shop: Shop) => {
    let newShops = [...shops, shop]
    setShops(newShops);

    let dataUser = {
      ...currentUser,
      shops: newShops
    }
    await AsyncStorage.setItem(userAuth, JSON.stringify(dataUser));
  }

  const addLike = async (id: any) => {
    let newShops = shops.map((shop) => {
      if (shop.id !== id) return shop
      else {
        shop.like = !shop.like;
        return shop;
      }
    });

    setShops(newShops);

    let dataUser = {
      ...currentUser,
      shops: newShops
    }
    await AsyncStorage.setItem(userAuth, JSON.stringify(dataUser));
  }

  return (
    <ShopsContext.Provider value={{
      shops,
      addShop,
      addLike,
    }}>
      {children}
    </ShopsContext.Provider>
  );
}