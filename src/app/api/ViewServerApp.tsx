import React, {useEffect, useState} from "react";
import {useWebSocketContext} from "../../components/websocket/HeartProvider";
import {Button, Text, View} from "@ant-design/react-native";
import {TextInput} from "react-native";
import newWebSocket from "../../components/websocket/wensocketConfig";
import {wsUri} from "../../utils/port";

function ViewServerApp(props:any) {


    const userId = 'usisjanz';
    const channelId = 'test1';
    const channelName = 'test1';

    const [value, setValue] = useState<string>('');

    const handleTextInputChange = (e: string) => {
        setValue(e);
    }

    // send msg to backend through websocket
    const handleSendMessage = () => {
        ws?.send(JSON.stringify({content: value}));
        setValue('');
    }

    const [ws, setWs] = useState<WebSocket>();


    useEffect(() => {
        newWebSocket(wsUri).then(res => {
            setWs(res);
        })
    }, []);

    const handleOpenCallback = (param: WebSocket) => {
        console.log('open call back');
    }

    const handleMessageCallback = (param: WebSocketMessageEvent) => {

    }

    const handleCloseCallback = (param: WebSocketMessageEvent) => {

    }


    return (
        <View>
            <Text>hello</Text>


            <TextInput
                value={value}
                onChangeText={(e:string) => handleTextInputChange(e)}
            />


            <Button disabled={value.length === 0} onPress={handleSendMessage}>Send Message</Button>

        </View>
    )
}

export default ViewServerApp;
