import React, {useContext} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {ThemeModeContext} from "../../context/themeMode";

const InfoShop = ({shop}: any) => {
  const {theme} = useContext(ThemeModeContext);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color: theme.colors.border}]}>Type:</Text>
      <Text
        style={{
          color: theme.colors.grey,
          marginBottom: 10,
          marginLeft: 10,
          fontSize: 16
        }}>
        {shop.type}
      </Text>
      <Text style={[styles.title, {color: theme.colors.border}]}>Phone:</Text>
      <Text
        style={{
          color: theme.colors.grey,
          marginLeft: 10,
          fontSize: 16
        }}>
        {shop.phone}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"

  }
})
export default InfoShop;