import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from "react-native";
import MapView, {Marker} from "react-native-maps";
import * as Location from "expo-location";
import Button from "../../components/Button";

import {Images} from "../../theme";
import {ShopsContext} from "../../context/shops";
import {Shop, TypeShop, TypeTask} from "../../common/types";
import ShopCard from "../../components/ShopCard";
import {ThemeModeContext} from "../../context/themeMode";
import SearchBar from "../../components/SearchBar";
import {FontAwesome} from "@expo/vector-icons";

const height = Dimensions.get('window').height

const Map = ({route, navigation}: any) => {

    const {theme} = useContext(ThemeModeContext)
    const {shops} = useContext(ShopsContext);


    const [mapRegion, setMapRegion] = useState<any>({
      latitude: 53.9374874,
      longitude: 27.5632255,
      latitudeDelta: 0.015,
      longitudeDelta: 0.015
    });

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
      setShopShow({
        show: false,
        shop: {}
      });
      setLikeFilter(like);
      setSearchText(text);
      setFilterShops(shops.filter((shop: Shop) => shop.name?.search(RegExp(text, "ig")) !== -1 && (like ? (shop.like === like) : true)))
    }

    return (
      <>
        {route.params?.viewAll && (
          <View style={styles.searchPanel}>
            <SearchBar
              style={{
                flex: 1,
                borderBottomWidth: 0,
              }}
              placeholder="Search..."
              onChangeText={(text: string) => onChangeFilter(text, likeFilter)}
            />
            <FontAwesome.Button
              onPress={() => onChangeFilter(searchText, !likeFilter)}
              name={likeFilter ? "star" : "star-o"}
              size={24}
              color="gold"
              // @ts-ignore
              backgroundColor="transparent"
              iconStyle={{
                margin: 0,
              }}
            />
          </View>
        )}

        {mapRegion && (
          <MapView
            style={styles.map}
            loadingEnabled={true}
            region={mapRegion}
            onPress={(e) => {
              setPressCoords(e.nativeEvent.coordinate);
            }}
            onRegionChangeComplete={setMapRegion}
            showsUserLocation={true}
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