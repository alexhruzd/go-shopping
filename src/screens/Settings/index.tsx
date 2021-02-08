import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/auth";
import {StyleSheet, Switch, Text, View} from "react-native";
import Button from "../../components/Button";
import {ThemeModeContext} from "../../context/themeMode";
import Slider from '@react-native-community/slider';

const Settings = () => {
  const {signOut} = useContext(AuthContext)
  const {theme, changeTheme} = useContext(ThemeModeContext);

  const [isLight, setIsLight] = useState<boolean>(theme.dark);
  const [valueRange, setValueRange] = useState(500);

  const onSignOut = async () => {
    await signOut();
  }

  const onChangeRange = (range: number) => {
    setValueRange(range);
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


      <View style={styles.radiusBlock}>
        <Text style={{color: theme.colors.grey, marginRight: 10}}>
          Shops radius ({valueRange} m)
        </Text>

        <Slider
          style={{width: "60%", marginTop: 10}}
          step={25}
          minimumValue={100}
          maximumValue={2000}
          value={valueRange}
          onValueChange={(range: number)=> onChangeRange(range)}
        />
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
  },
  radiusBlock: {
    width: "95%",
    alignItems: "center",
    marginTop: 40
  }
})

export default Settings;