import {useEffect, useState} from "react";
import {Toast} from "@ant-design/react-native";
import {View} from "react-native";

interface ILoading {
    loading: boolean
}

const Loading = (props:ILoading) => {

    const [key, setKey] = useState<any>();

    useEffect(() => {

        if (props.loading){
            const key = Toast.loading('配置加载中', 0);
            setKey(key)
        }
        else{
            Toast.remove(key);
        }
    }, [props.loading])

    return (
        <View />
    )
}


export default Loading;
