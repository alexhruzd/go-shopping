import React from 'react';
import {StyleSheet, View} from "react-native";

import Button from "../../components/Button";



const Welcome = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => navigation.navigate("SingIn")}
        title="SingIn"
        type="outline"
        style={{
          marginBottom: 20
        }}
      />
      <Button
        onPress={() => navigation.navigate("Register")}
        title="Register"
        type="outline"
      />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
})