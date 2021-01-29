import React, {useContext} from 'react';
import {Button} from "react-native-elements";
import {ShopsContext} from "../../context/shops";

const ButtonLike = ({id, like}: any) => {

  const {addLike} = useContext(ShopsContext);

  const onLikeShop = () => {
    addLike(id);
  }

  return (
    <Button
      type="clear"
      titleStyle={{color: "red"}}
      icon={{
        name: like ? "star" : "star-o",
        type: "font-awesome",
        size: 18,
        color: "red"
      }}
      onPress={onLikeShop}
    />
  );
}

export default ButtonLike;