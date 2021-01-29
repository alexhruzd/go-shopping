import React, {useContext, useEffect, useRef} from 'react';
import {Button, Card, Divider, Text} from "react-native-elements";
import {Animated, StyleSheet, View} from "react-native";
import ButtonLike from "../ButtonLike";
import {ThemeModeContext} from "../../context/themeMode";
import InfoShop from "../InfoShop";

const ShopCard = ({shop, show, onHide}: any) => {

  const {theme} = useContext(ThemeModeContext);
  const animationView = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (show)
      Animated.timing(animationView, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start()
    else
      Animated.timing(animationView, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start()
  }, [show])

  return (
    <Animated.View
      style={{
        backgroundColor: theme.colors.background,
        width: '100%',
        height: 200,
        position: "absolute",
        bottom: 0,
        transform: [
          {
            translateY: animationView.interpolate({
              inputRange: [0, 1],
              outputRange: [200, 0]
            })
          }
        ]
      }}
    >
      <View style={styles.headerCard}>
        <Button
          type="clear"
          icon={{
            name: "times",
            type: "font-awesome",
            size: 22,
            color: theme.colors.grey
          }}
          onPress={onHide}
        />
        <Text
          h3
          style={{
            flex: 1,
            textAlign: "center",
          }}
        >{shop.name}</Text>
        <ButtonLike id={shop.id} like={shop.like}/>
      </View>
      <Divider style={{backgroundColor: theme.colors.border}}/>
      <InfoShop shop={shop}/>
    </Animated.View>
  );
};

const styles = StyleSheet.create({

  headerCard: {
    display: "flex",
    flexDirection: "row",
    padding: 2
  }
})

export default ShopCard;