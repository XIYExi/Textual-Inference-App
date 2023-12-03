import {Button, View} from "@ant-design/react-native";
import {chatClient, chatUserId} from "../chat/steam/chatConfig";
import {ChannelSort} from "stream-chat";
import {ChannelList, Channel, MessageList, MessageInput} from "stream-chat-react-native";
import {StyleSheet} from "react-native";
import React, {useState} from "react";


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


function ApiApp() {

    const [channel, setChannel] = useState(null);

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

        console.log('\n');

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

        console.log('\n');
    }

    // channel cid
    const channelCid = 'messaging:test_1';
    // channel name
    const channelName = 'test_1'

    return (
        <View>
            <Button onPress={() => testMessageSearch()}>chatClient.search</Button>
            <Button onPress={() => testChannelQuery()}>chatClient.queryChannels</Button>

            <View style={{height: '100%'}}>
                <View
                    style={[styles.channelListContainer]}>

                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    channelListContainer: {
        height: '100%',
        position: 'absolute',
        width: '100%',
    },
    emptyIndicatorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
    emptyIndicatorText: {paddingTop: 28},
    flex: {
        flex: 1,
    },
    searchContainer: {
        alignItems: 'center',
        borderRadius: 30,
        borderWidth: 1,
        flexDirection: 'row',
        margin: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        includeFontPadding: false, // for android vertical text centering
        padding: 0, // removal of default text input padding on android
        paddingHorizontal: 10,
        paddingTop: 0, // removal of iOS top padding for weird centering
        textAlignVertical: 'center', // for android vertical text centering
    },
});


export default ApiApp;
