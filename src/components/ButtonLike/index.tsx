import React, {useContext} from 'react';
import {ShopsContext} from "../../context/shops";
import {FontAwesome} from "@expo/vector-icons";

const ButtonLike = ({id, like}: any) => {

  const {addLike} = useContext(ShopsContext);

  const onLikeShop = () => {
    addLike(id);
  }

  return (
    <FontAwesome.Button
      onPress={onLikeShop}
      name={like ? "star-o" : "star"}
      color="red"
      // @ts-ignore
      backgroundColor="transparent"
      iconStyle={{
        margin: 0,
      }}
    />
  );
}

export default ButtonLike;