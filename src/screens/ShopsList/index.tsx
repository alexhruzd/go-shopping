import React, {useContext, useEffect, useState} from 'react';
import {ShopsContext} from "../../context/shops";
import {Shop} from "../../common/types";
import {Dimensions, FlatList, StyleSheet, View} from "react-native";
import {ThemeModeContext} from "../../context/themeMode";
import ShopItem from "../../components/ShopItem";
import SearchBar from "../../components/SearchBar";

const height = Dimensions.get('window').height

const ShopsList = () => {

  const {shops} = useContext(ShopsContext)
  const {theme} = useContext(ThemeModeContext)

  const [filterShops, setFilterShops] = useState(shops);
  const [searchText, setSearchText] = useState("");

  useEffect(()=> {
    onChange(searchText);
  },[shops])

  const onChange = (text: string) => {
    setSearchText(text);
    setFilterShops(shops.filter((shop: Shop)=> shop.name?.search(RegExp(text, "ig")) !== -1 ))
  }

  const renderItem = ({item}: any) => (
    <ShopItem
      shop={item}
    />
  );

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search..."
        onChangeText={onChange}
      />
      <FlatList data={filterShops} renderItem={renderItem} keyExtractor={item => item.id}/>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30
  }
})

export default ShopsList;