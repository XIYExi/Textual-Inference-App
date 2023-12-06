import {inject, observer} from "mobx-react";
import {View} from "@ant-design/react-native";
import {useEffect, useState} from "react";
import {useThemeContext} from "../themeContext";

function ThemeView(props:any) {
    const {userStore} = props;
    const [bg, setBg] = useState('#fff');
    const themeContext = useThemeContext();

    useEffect(() => {
        // @ts-ignore
        if(userStore?.mode === 'Light') {
            // light
            setBg(themeContext.light.backgroundColor);
        }
        else {
            setBg(themeContext.dark.backgroundColor);
        }
    }, [userStore?.mode])

    return (
        <View style={[{backgroundColor: bg}, props.style]}>{props.children}</View>
    )
}

export default inject('userStore')(observer(ThemeView))
