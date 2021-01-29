import React, {useContext} from 'react';
import {Button as RNEButton} from "react-native-elements";
import {ThemeModeContext} from "../../context/themeMode";

const Button = ({title, type, containerStyle, ...props}: any) => {

  const {theme} = useContext(ThemeModeContext);

  return (
    <RNEButton
      title={title}
      type={type}
      buttonStyle={{borderColor: theme?.colors.border, borderWidth: 2}}
      titleStyle={{color: theme?.colors.border, fontSize: 24}}
      containerStyle={{ width: '50%', ...containerStyle}}
      {...props}
    />

  );
};

export default Button;