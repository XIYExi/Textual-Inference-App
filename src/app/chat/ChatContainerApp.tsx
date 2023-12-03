import {View} from "@ant-design/react-native";
import React from "react";
import {StyleSheet} from "react-native";
import { MessageInput, MessageList } from 'stream-chat-react-native';
import {useAppContext} from "../../AppContext";
import {InlineDateSeparator} from "./InlineDateSeparator";


function ChatContainerApp(props:any) {

    const { navigation } = props;
    const { channel } = useAppContext();

    return(
        <View style={StyleSheet.absoluteFill}>
            <MessageList
                StickyHeader={() => null}
                InlineDateSeparator={InlineDateSeparator}
            />
            <MessageInput />
        </View>
    )
}


export default ChatContainerApp;

