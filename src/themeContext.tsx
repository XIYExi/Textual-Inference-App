import React, { ReactNode } from "react";
import {theme} from "./theme";


type ThemeColorType = {
    backgroundColor: string;
    color: string;
}

type ThemeContextType = {
    dark: ThemeColorType;
    light: ThemeColorType;
}


export const ThemeContext = React.createContext({} as ThemeContextType);


export const ThemeProvider = (props: {children: ReactNode}) => {
    const {children} = props;


    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};


export const useThemeContext = () => React.useContext(ThemeContext);
