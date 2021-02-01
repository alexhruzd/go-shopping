import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from "react-native";
import MapView, {Marker} from "react-native-maps";
import * as Location from "expo-location";
import Button from "../../components/Button";
import {Button as RNEButton} from "react-native-elements";

import {Images} from "../../theme";
import {ShopsContext} from "../../context/shops";
import {Shop, TypeShop, TypeTask} from "../../common/types";
import ShopCard from "../../components/ShopCard";
import {SearchBar} from "react-native-elements";
import {ThemeModeContext} from "../../context/themeMode";
import * as TaskManager from 'expo-task-manager';

const height = Dimensions.get('window').height

const Map = ({route, navigation}: any) => {

    const {theme} = useContext(ThemeModeContext)
    const {shops} = useContext(ShopsContext);


    const [mapRegion, setMapRegion] = useState<any>(null);

    const [searchText, setSearchText] = useState("");
    const [likeFilter, setLikeFilter] = useState(false);
    const [filterShops, setFilterShops] = useState(shops);

    const [shopShow, setShopShow] = useState<any>({
      show: false,
      shop: {}
    });

    const [pressCoords, setPressCoords] = useState({
      latitude: 59.9374831,
      longitude: 27.5632955,
    });

    useEffect(() => {
      (async () => {
        let {status} = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015
        });
        setPressCoords({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      })();
    }, [])




    const getMarkerShop = (type: any) => {
      switch (type) {
        case TypeShop.FOOD:
          return Images.markerFoodShop;
        case TypeShop.CLOTHES:
          return Images.markerClothesShop;
        case TypeShop.SHOES:
          return Images.markerShoesShop;
        case TypeShop.SPORT:
          return Images.markerSportShop;
        default:
          return Images.markerOtherShop;
      }
    }

    const onChangeFilter = (text: string, like: boolean) => {
      setLikeFilter(like);
      setSearchText(text);
      setFilterShops(shops.filter((shop: Shop) => shop.name?.search(RegExp(text, "ig")) !== -1 && (like ? shop.like === like : true)))
    }

    return (
      <>
        {route.params?.viewAll && (
          <View style={styles.searchPanel}>
            <SearchBar
              containerStyle={{flex: 1}}
              placeholder="Search..."
              value={searchText}
              onChangeText={(text) => onChangeFilter(text, likeFilter)}
              lightTheme={!theme.dark}
            />
            <RNEButton
              type="clear"
              titleStyle={{color: "gold"}}
              icon={{
                name: likeFilter ? "star" : "star-o",
                type: "font-awesome",
                size: 25,
                color: "orange"
              }}
              onPress={() => onChangeFilter(searchText, !likeFilter)}
            />
          </View>

        )}
        {mapRegion && (
          <MapView
            style={styles.map}
            loadingEnabled={true}
            initialRegion={mapRegion}
            onPress={(e) => {
              setPressCoords(e.nativeEvent.coordinate);
            }}
            onRegionChange={setMapRegion}
          >
            {route.params?.isAdd && (
              <Marker
                coordinate={{
                  latitude: pressCoords.latitude,
                  longitude: pressCoords.longitude,
                }}
                draggable
                icon={Images.markerNewShop}
              />
            )}

            {route.params?.viewAll && (
              filterShops.map((shop: any) => (
                <Marker
                  coordinate={shop.coords}
                  key={shop.id}
                  description={shop.name}
                  icon={getMarkerShop(shop.type)}
                  onPress={() => setShopShow({
                    show: true,
                    shop: shop
                  })}
                />

              ))
            )}

          </MapView>
        )}


        <ShopCard
          shop={shopShow.shop}
          show={shopShow.show}
          onHide={() => setShopShow({
            show: false,
            shop: {}
          })}
        />


        {route.params?.isAdd && (
          <View style={styles.button}>
            <Button
              title='Add'
              type="outline"
              onPress={() => {
                navigation.navigate("Add Shop", {pressCoords: pressCoords});
              }}
            />
          </View>
        )}
      </>
    );
  }
;

const styles = StyleSheet.create(
  {
    map: {
      height
    },
    button: {
      width: "50%",
      position: "absolute",
      top: "5%",
      left: "5%"
    },
    searchPanel: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    }
  }
)

export default Map;