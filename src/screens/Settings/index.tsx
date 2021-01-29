import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/auth";
import {StyleSheet, Switch, Text, View} from "react-native";
import Button from "../../components/Button";
import {ThemeModeContext} from "../../context/themeMode";
import {NotificationContext} from "../../context/notification";

const Settings = () => {
  const {signOut} = useContext(AuthContext)
  const {theme} = useContext(ThemeModeContext);

  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const onSignOut = async () => {
    await signOut();
  }

  return (
    <View style={styles.container}>
      <Text>Settings screen!</Text>
      <Button
        title="Sign Out"
        type="outline"
        onPress={onSignOut}
        containerStyle={{marginBottom: 20}}
      />

      <Switch
        trackColor={{false: theme.colors.background, true: theme.colors.primary}}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        value={isEnabled}
        onValueChange={()=>setIsEnabled((prev: boolean) => !prev)}
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
})

export default Settings;