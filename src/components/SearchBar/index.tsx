import React, {useContext, useState} from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import {ThemeModeContext} from "../../context/themeMode";

interface PropsSearchBar {
  placeholder?: string,
  onChangeText?: any,
  style?: any
}

const SearchBar = ({placeholder, onChangeText, style}: PropsSearchBar) => {
  const {theme} = useContext(ThemeModeContext);

  const [value, setValue] = useState("");

  const onChangeValue = (text: string) => {
    setValue(text);
    onChangeText(text);
  }

  return (
    <View style={[ styles.container, {
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.grey
    }, style]}>
      <FontAwesome name="search" size={24} color={theme.colors.grey} />
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeValue}
        value={value}
        style={{
          flex: 1,
          fontSize: 18,
          marginLeft: 10
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
})

export default SearchBar;