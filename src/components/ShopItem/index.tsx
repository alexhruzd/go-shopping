import React, {useContext} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import ButtonLike from "../ButtonLike";
import {getAvatarShop, Shop} from "../../common/types";
import {ThemeModeContext} from "../../context/themeMode";

interface PropsShopItem {
  shop?: Shop
}

const ShopItem = ({shop}: PropsShopItem) => {

  const {theme} = useContext(ThemeModeContext)

  return (
    <View
      style={{
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border
      }}
    >
    <View style={styles.header}>
      <Image style={styles.avatar} source={getAvatarShop(shop?.type)}/>
      <Text
        style={{
          flex: 1,
          fontSize: 18,
          fontWeight: "bold",
          color: theme.colors.text
        }}
      >{shop?.name}</Text>
      <ButtonLike id={shop?.id} like={shop?.like}/>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({

  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    height: 48,
    width: 48,
    marginRight: 10
  }
})

export default ShopItem;