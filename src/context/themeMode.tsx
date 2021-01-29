import React, {createContext, useState} from "react";
import {lightTheme, MyDarkTheme, MyLightTheme} from "../theme";


export const ThemeModeContext = createContext<{
  theme?: any,
  setDark?: any,
  serLight?: any
}>({})

export const ThemeModeProvider = ({children}: any) => {
  const [theme, setTheme] = useState(MyLightTheme);

  return (
    <ThemeModeContext.Provider value={{
      theme
    }}>
      {children}
    </ThemeModeContext.Provider>
  )
}