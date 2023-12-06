import {Text} from "@ant-design/react-native";
import {inject, observer} from "mobx-react";
import {useEffect, useState} from "react";
import {useThemeContext} from "../themeContext";


function ThemeText(props: any) {

    const {userStore} = props;
    const [color, setColor] = useState('#212121');
    const themeContext = useThemeContext();

    useEffect(() => {
        // @ts-ignore
        if(userStore?.mode == 'Light') {
            // light
            setColor(themeContext.light.color);
        }
        else {
            setColor(themeContext.dark.color);
        }
    }, [userStore?.mode])


    return (
        <Text style={[{color: color}, props.style]}>{props.children}</Text>
    )
}

export default inject('userStore')(observer(ThemeText))
