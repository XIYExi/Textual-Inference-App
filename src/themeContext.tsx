import React, {ReactNode, useState} from "react";
import {theme} from "./theme";


type ThemeColorType = {
    backgroundColor: string;
    color: string;
}

type ThemeContextType = {
    dark: ThemeColorType;
    light: ThemeColorType;
    mode: string;
    setMode: (param: string) => void;
}


export const ThemeContext = React.createContext({} as ThemeContextType);


export const ThemeProvider = (props: {children: ReactNode}) => {
    const {children} = props;
    const [mode, setMode] = useState('Light');

    const _theme = {
        ...theme,
        mode,
        setMode
    }

    return (
        <ThemeContext.Provider value={_theme}>
            {children}
        </ThemeContext.Provider>
    );
};


export const useThemeContext = () => React.useContext(ThemeContext);
