import React, {useContext, useEffect, useState} from 'react';
import { Picker, StyleSheet, Text, View} from "react-native";
import Button from "../../components/Button";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {Input} from "react-native-elements";
import {ThemeModeContext} from "../../context/themeMode";
import {ShopsContext} from "../../context/shops";
import {Shop, TypeShop} from "../../common/types";
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

const schema = yup.object().shape({
  nameShop: yup.string().required("Name is required!"),
  typeShop: yup.string().required("Name is required!"),
});


const CreateShop = ({navigation, route}: any) => {

  const {register, handleSubmit, setValue, errors} = useForm({
    mode: "onChange",
    resolver: yupResolver(schema)
  })

  const {theme} = useContext(ThemeModeContext);
  const {addShop} = useContext(ShopsContext)

  const [selectedType, setSelectedType] = useState("Food");
  const [shopCoords, setShopCoords] = useState<any>({});

  useEffect(()=> {
    if(route.params?.pressCoords) {
      setShopCoords(route.params?.pressCoords);
    }
  }, [route.params?.pressCoords])

  useEffect(() => {
    register('nameShop');
    register('phone');
    register({name: "typeShop", value: "Food"});
  }, [register])

  const onAddShop = (data: any) => {
    let shop: Shop;
    shop = {
      id: uuid(),
      name: data.nameShop,
      type: data.typeShop,
      phone: data.phone,
      coords: shopCoords,
      like: false,
    }

    addShop(shop);
  }

  return (
    <View style={styles.container}>

      <Input
        label="Enter name Shop:"
        onChangeText={(text) => setValue('nameShop', text, {shouldValidate: true})}
        errorMessage={errors.nameShop?.message}
      />

      <Picker
        selectedValue={selectedType}
        onValueChange={(text) => {
          setValue("typeShop", text);
          setSelectedType(text);
        }}
        style={{
          height: 50,
          width: "100%",
          color: theme.colors.card,
          marginBottom: 20
        }}

      >
        <Picker.Item label={TypeShop.FOOD} value={TypeShop.FOOD}/>
        <Picker.Item label={TypeShop.CLOTHES} value={TypeShop.CLOTHES}/>
        <Picker.Item label={TypeShop.SHOES} value={TypeShop.SHOES}/>
        <Picker.Item label={TypeShop.SPORT} value={TypeShop.SPORT}/>
        <Picker.Item label={TypeShop.OTHER} value={TypeShop.OTHER}/>
      </Picker>

      <Input
        label="Enter phone number:"
        keyboardType="number-pad"
        onChangeText={(text) => setValue('phone', text, {shouldValidate: true})}
        errorMessage={errors.phone?.message}
      />

      <View style={styles.row}>
        <Button
          title="Get coordinates"
          type="outline"
          onPress={()=>navigation.navigate("Map", {isAdd: true})}
        />
        <Text>Latitude: '{shopCoords.latitude}'</Text>
        <Text>Longitude: '{shopCoords.longitude}'</Text>
      </View>

      <Button
        title="Add Shop"
        type="outline"
        onPress={handleSubmit(onAddShop)}
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
  row: {
    width: "100%",
    display: "flex",
    marginBottom: 20
  }

})

export default CreateShop;