import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/auth";
import {StyleSheet, Switch, Text, View} from "react-native";
import Button from "../../components/Button";
import {ThemeModeContext} from "../../context/themeMode";

const Settings = () => {
  const {signOut} = useContext(AuthContext)
  const {theme, changeTheme} = useContext(ThemeModeContext);

  const [isLight, setIsLight] = useState<boolean>(theme.dark);

  const onSignOut = async () => {
    await signOut();
  }

  const onChangeTheme = () => {
    setIsLight(!isLight);

    if(!isLight) {
      changeTheme("dark");
    }
    else {
      changeTheme("light");
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.themeBlock}>
        <Text style={{color: theme.colors.grey, marginRight: 10}}>Light Theme</Text>
        <Switch
          trackColor={{false: theme.colors.background, true: theme.colors.primary}}
          thumbColor={isLight ? "#f5dd4b" : "#f4f3f4"}
          value={isLight}
          onValueChange={onChangeTheme}
        />
        <Text style={{color: theme.colors.grey, marginLeft: 10}}>Dark Theme</Text>
      </View>

      <Button
        title="Sign Out"
        type="outline"
        onPress={onSignOut}
        style={{marginTop: 50}}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  themeBlock: {
    display: "flex",
    flexDirection: "row"
  }
})

export default Settings;