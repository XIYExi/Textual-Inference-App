import {Button, View} from "@ant-design/react-native";
import {chatClient, chatUserId, chatUserName, chatUserToken} from "../chat/steam/chatConfig";
import {ChannelSort} from "stream-chat";
import {ChannelList, Channel, MessageList, MessageInput} from "stream-chat-react-native";
import {StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import {useChatClient} from "../chat/steam/useChatClient";


const filters = {
    members: {
        $in: [chatClient?.user?.id || null]
    },
    type: 'messaging',
};

const sort: ChannelSort = {
    last_message_at: -1,
};

const options = {
    presence: true,
    state: true,
    watch: true,
};


const user = {
    id: chatUserId,
    name: chatUserName,
    image: 'https://i.imgur.com/fR9Jz14.png',
};


function ApiApp() {

    const [channel, setChannel] = useState(null);

    // @ts-ignore
    useEffect(() => {
        const setupClient = async () => {
            try {
                const answer = await chatClient.connectUser(user, chatUserToken);
                console.log('useChatClient wait connect... : -> ', answer)
            } catch (error) {
                if (error instanceof Error) {
                    console.error(`An error occurred while connecting the user: ${error.message}`);
                }
            }
        };

        // If the chat client has a value in the field `userID`, a user is already connected
        // and we can skip trying to connect the user again.
        if (!chatClient.userID) {
            setupClient();
            // console.log(chatClient.userID)
        }

        return () => chatClient.disconnectUser();
    }, []);

    const testMessageSearch = async () => {

        console.log('begin query chatClient.search: -> \n');

        const res = await chatClient?.search(
            {
                members: {
                    $in: [chatClient?.user?.id || null],
                },
            },
            'empty',
            {
                limit: 10,
                offset: 0,
            },
        );

        console.log(res);
        console.log('search end.')

    }

    const testChannelQuery = async() => {

        console.log('begin query chatClient.queryChannels: -> \n');
        const filter = { type: 'messaging', members: { $in: [chatClient?.user?.id || null] } };
        const sort = [{ last_message_at: -1 }];

        const channels = await chatClient.queryChannels(filter, sort as any, {
            watch: true, // this is the default
            state: true,
        });

        console.log('Channel item : -> \n');
        // @ts-ignore
        channels.map((item:any, _) => {
            console.log(item.data.name, item.cid);
            if (item.data.name === channelName) {
                setChannel(item);
                console.log('set channel to state: -> \n');
            }
        })

        console.log('query end.');
    }

    const testCreateChannel = async () => {
        console.log('begin create chatClient.createChannel: -> \n');

        const channel = chatClient.channel(
            "messaging",
            "testCreateChannel",
            {
                name: "JustFor.dev"
            }
        )
        await channel.watch(); // 通过.watch()自动订阅消息


        console.log('end create chatClient.createChannel.\n');
    }

    // channel cid
    const channelCid = 'messaging:test_1';
    // channel name
    const channelName = 'test_1'

    return (
        <View>
            <Button onPress={() => testMessageSearch()}>chatClient.search</Button>
            <Button onPress={() => testChannelQuery()}>chatClient.queryChannels</Button>
            <Button onPress={() => testCreateChannel()}>chatClient.createChannel</Button>


        </View>
    )
}


export default ApiApp;
