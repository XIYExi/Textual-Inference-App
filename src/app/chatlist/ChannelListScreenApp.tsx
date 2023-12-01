import React from "react";
import {ChannelList} from "stream-chat-react-native";
import {chatUserId} from "../chat/steam/chatConfig";
import {useAppContext} from "../../AppContext";
import {useChatClient} from "../chat/steam/useChatClient";
import {View} from "@ant-design/react-native";


// 过滤
const filters = {
    members: {
        '$in': [chatUserId]
    },
};

const sort = {
    last_message_at: -1,
};

const ChannelListScreenApp = (props: any) => {

    const { setChannel } = useAppContext();

    const {clientIsReady} = useChatClient();

    if (!clientIsReady)
        return (
            <View>
               Stream Chat is not ready...
            </View>
        )


    return (
        <ChannelList
            onSelect={(channel) => {
                const { navigation } = props;
                setChannel(channel);
                navigation.navigate('chat');
            }}
            filters={filters}
            // @ts-ignore
            sort={sort}
        />

    )
}


export default ChannelListScreenApp;
