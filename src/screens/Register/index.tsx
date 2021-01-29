import React, {useContext, useEffect, useState} from 'react';

import * as yup from "yup";

import {useForm} from "react-hook-form";
import {StyleSheet, Text, View} from "react-native";
import {yupResolver} from "@hookform/resolvers/yup";
import {Input} from "react-native-elements";

import Button from "../../components/Button";
import {AuthContext} from "../../context/auth";


const schema = yup.object().shape({
  login: yup.string().required("Login is required!"),
  name: yup.string().required("Name is required!"),
  password: yup.string().required("Password is required!"),
  confirm: yup.string().required("Confirm is required!")
});

const Register = () => {
  const {register, handleSubmit, setValue, errors} = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    register('login');
    register('name');
    register('password');
    register('confirm');
  }, [register])

  const { signUp }: any = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("")

  const onSubmit = async (data: any) => {

    if (data.password !== data.confirm) {
      setErrorMessage("Password is incorrect!");
    } else {
      try {
        await signUp(data);
      } catch (e) {
        setErrorMessage(e?.message);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Input
        label="Enter login or email:"
        onChangeText={(text) => setValue('login', text, {shouldValidate: true})}
        errorMessage={errors.login?.message}
      />
      <Input
        label="Enter name:"
        onChangeText={(text) => setValue('name', text, {shouldValidate: true})}
        errorMessage={errors.name?.message}
      />
      <Input
        label="Enter password:"
        onChangeText={(text) => setValue('password', text, {shouldValidate: true})}
        errorMessage={errors.password?.message}
      />
      <Input
        label="Confirm password:"
        onChangeText={(text) => setValue('confirm', text, {shouldValidate: true})}
        errorMessage={errors.confirm?.message}
      />

      {errorMessage.length !== 0 && (
        <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
      )}

      <Button
        title="Register"
        onPress={handleSubmit(onSubmit)}
        type="outline"
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


export default Register;