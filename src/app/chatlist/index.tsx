import React from "react";
import {Text, View} from "@ant-design/react-native";
import ChannelListScreenApp from "./ChannelListScreenApp";


interface IProps {

}

interface IState {

}


class ChatListApp extends React.Component<IProps, IState> {
    constructor(props:IProps) {
        super(props);
    }


    render() {

        return (
            <View>
                <ChannelListScreenApp />
            </View>
        )
    }
}


export default ChatListApp;
