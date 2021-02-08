import React, {useContext, useEffect, useRef} from 'react';
import {Animated, Dimensions, StyleSheet, Text, View} from "react-native";
import ButtonLike from "../ButtonLike";
import {ThemeModeContext} from "../../context/themeMode";
import InfoShop from "../InfoShop";
import { FontAwesome } from '@expo/vector-icons';
import {Shop} from "../../common/types";

const height = Dimensions.get('window').height

interface PropsShopCard {
  shop?: Shop,
  show?: boolean,
  onHide?: any
}

const ShopCard = ({shop, show, onHide}: PropsShopCard) => {

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
        height: height/3.6,
        position: "absolute",
        bottom: 0,
        transform: [
          {
            translateY: animationView.interpolate({
              inputRange: [0, 1],
              outputRange: [height/3.6, 0]
            })
          }
        ]
      }}
    >
      <View style={styles.headerCard}>
        <FontAwesome.Button
          onPress={onHide}
          name="times"
          size={22}
          color={theme.colors.grey}
          // @ts-ignore
          backgroundColor="transparent"
          iconStyle={{
            margin: 0,
          }}
        />
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            color: theme.colors.text,
            fontWeight: "bold",
            fontSize: 28
          }}
        >{shop?.name}</Text>
        <ButtonLike id={shop?.id} like={shop?.like}/>
      </View>
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