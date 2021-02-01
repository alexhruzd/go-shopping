import React, {createContext, useContext, useEffect, useState} from "react";
import {AuthContext} from "./auth";
import {AsyncStorage} from "react-native";
import {Shop} from "../common/types";

export const ShopsContext = createContext<{
  shops?: any,
  addShop?: any,
  addLike?: any,
}>({});

export const ShopsProvider = ({children}: any) => {
  const {userAuth} = useContext(AuthContext);

  const [shops, setShops] = useState<Shop[]>([]);
  const [currentUser, setCurrentUser]= useState({});

  useEffect(() => {
    (async () => {
      let userIs = await AsyncStorage.getItem(userAuth);
      if (userIs !== null) {
        let user = JSON.parse(userIs);
        setCurrentUser(user)
        setShops(user.shops || []);
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
    console.log("DATAUSER",dataUser)
    await AsyncStorage.setItem(userAuth, JSON.stringify(dataUser));
  }

  const addLike = async (id:any) => {
    let newShops = shops.map((shop)=> {
      if(shop.id !== id) return shop
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