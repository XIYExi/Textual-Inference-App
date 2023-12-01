import React from "react";
import {Text, View} from "@ant-design/react-native";
import {ChannelList} from "stream-chat-react-native";
import {chatUserId} from "../chat/steam/chatConfig";
import {useChatClient} from "../chat/steam/useChatClient";
import ChannelListScreenApp from "./ChannelListScreenApp";


interface IProps {

}

interface IState {

}



function ChatList(){
    const { clientIsReady } = useChatClient();


    if (!clientIsReady) {
        return <Text>Loading chat ...</Text>
    }

    return (
        <View>...</View>
    )
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
