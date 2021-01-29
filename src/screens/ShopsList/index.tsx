import React, {useContext, useEffect, useState} from 'react';
import {ShopsContext} from "../../context/shops";
import {Avatar, Button, Header, ListItem, SearchBar} from "react-native-elements";
import {Shop, TypeShop} from "../../common/types";
import {FlatList, StyleSheet} from "react-native";
import {ThemeModeContext} from "../../context/themeMode";
import {Images} from "../../theme";
import ButtonLike from "../../components/ButtonLike";

const ShopsList = () => {

  const {shops} = useContext(ShopsContext)
  const {theme} = useContext(ThemeModeContext)

  const [filterShops, setFilterShops] = useState(shops);
  const [searchText, setSearchText] = useState("");

  useEffect(()=> {
    onChange(searchText);
  },[shops])

  const getAvatarShop = (type: any) => {
    switch (type) {
      case TypeShop.FOOD:
        return Images.foodShop;
      case TypeShop.CLOTHES:
        return Images.clothesShop;
      case TypeShop.SHOES:
        return Images.shoesShop;
      case TypeShop.SPORT:
        return Images.sportShop;
      default:
        return Images.otherShop;
    }
  }

  const onChange = (text: string) => {
    setSearchText(text);
    setFilterShops(shops.filter((shop: Shop)=> shop.name?.search(RegExp(text, "ig")) !== -1 ))
  }

  const renderItem = ({item}: any) => (
    <ListItem bottomDivider>
      <Avatar
        source={getAvatarShop(item.type)}
      />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem.Content>

      <ButtonLike id={item.id} like={item.like} />

    </ListItem>
  );

  return (
    <>
      <Header
        centerComponent={{
          text: "Shops",
          style: {
            color: theme.colors.text,
          }
        }}
        backgroundColor={theme.colors.card}
      />
      <SearchBar
        placeholder="Search..."
        value={searchText}
        onChangeText={onChange}
        lightTheme={!theme.dark}
      />
      <FlatList data={filterShops} renderItem={renderItem} keyExtractor={item => item.id}/>
    </>
  );
};

export default ShopsList;