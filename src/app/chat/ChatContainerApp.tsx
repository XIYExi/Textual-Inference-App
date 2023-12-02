import {View} from "@ant-design/react-native";
import React from "react";
import {StyleSheet} from "react-native";
import {Chat, Channel, MessageInput, MessageList} from 'stream-chat-react-native';
import {useAppContext} from "../../AppContext";


function ChatContainerApp(props:any) {

    const { navigation } = props;
    const { channel } = useAppContext();

    console.log('2. channel: -> ', channel, '\n')

    return(
        <View>
            <Channel channel={channel as any}>
                <MessageList
                    onThreadSelect={(message) => {
                        if (channel?.id) {
                            navigation.navigate('ThreadScreen');
                        }
                    }}
                />
                <MessageInput />
            </Channel>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default ChatContainerApp;

