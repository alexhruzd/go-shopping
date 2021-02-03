import React from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import { FontAwesome } from '@expo/vector-icons';

interface PropsSearchBar {
  placeholder?: string,
  onChangeText?: void
}

const SearchBar = ({placeholder, onChangeText}: PropsSearchBar) => {
  return (
    <View style={styles.container}>
      <FontAwesome name="search" size={32} />
      <TextInput />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    display: "flex",
    flexDirection: "row"
  }
})

export default SearchBar;