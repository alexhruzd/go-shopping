import React, {useContext} from 'react';
import {StyleSheet, Text, View} from "react-native";
import Button from "../../components/Button";

const Home = ({navigation}: any) => {

  return (
    <View style={styles.container}>
      <Button
        title="Map"
        type="outline"
        onPress={() => navigation.navigate("Map", {viewAll: true})}
        containerStyle={{marginBottom: 20}}
      />
      <Button
        title="Add shop"
        type="outline"
        onPress={() => navigation.navigate("Add Shop")}
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

export default Home;