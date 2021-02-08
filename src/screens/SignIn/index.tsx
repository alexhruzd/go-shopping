import React, {useContext, useEffect, useState} from 'react';

import * as yup from 'yup';

import {useForm} from "react-hook-form/dist";
import {StyleSheet, Text, View} from "react-native";
import {yupResolver} from "@hookform/resolvers/yup";
import Input from "../../components/Input";

import Button from "../../components/Button";
import {AuthContext} from "../../context/auth";

const schema = yup.object().shape({
  login: yup.string().required("Login is required!"),
  password: yup.string().required("Password is required!")
});

const SignIn = () => {

  const {register, handleSubmit, setValue, errors} = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  })

  const { signIn } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    register('login');
    register('password');
  }, [register])

  const onSubmit = async (data: any) => {
    try {
      await signIn(data);
    } catch (e) {
      setErrorMessage(e?.message);
    }
  }

  return (
    <View style={styles.container}>
      <Input
        label="Enter login or email:"
        onChangeText={(text:string) => setValue('login', text, {shouldValidate: true})}
        errorMessage={errors.login?.message}
      />
      <Input
        label="Enter password:"
        onChangeText={(text:string) => setValue('password', text, {shouldValidate: true})}
        errorMessage={errors.password?.message}
      />

      {errorMessage.length !== 0 && (
        <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
      )}

      <Button
        title="SignIn"
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
    backgroundColor: "#fff",
  },
})

export default SignIn;