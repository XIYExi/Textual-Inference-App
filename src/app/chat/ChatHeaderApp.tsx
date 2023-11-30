import {Flex, Text, View} from "@ant-design/react-native";
import {Image, Pressable, StyleSheet} from "react-native";
import React from "react";
import {IChatStore} from "../../mobx/chatStore";

interface IChatHeaderApp {
    chatStore: IChatStore;
}

function ChatHeaderApp(props:IChatHeaderApp) {

    const {chatStore} = props;

    return (
        <Flex style={styles.header} justify="between" align='center'>
            <Flex.Item>
                <Image source={require('../../assets/chat/back.png')} style={styles.backIcon}/>
            </Flex.Item>
            <Flex.Item>
                <Text style={styles.title}> ChattyAI</Text>
            </Flex.Item>
            <Flex.Item>
                <View style={{position: 'relative'}}>
                    <Flex justify='end'>
                        <Pressable onPress={() => chatStore.changeOpenAddon()}>
                            <View>
                                <Image
                                    source={require('../../assets/chat/config.png')}
                                    style={{
                                        width: 20,
                                        height: 20,
                                    }}
                                />
                            </View>
                        </Pressable>
                    </Flex>
                </View>
            </Flex.Item>
        </Flex>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 10,
    },
    backIcon: {
        width: 28,
        height: 28
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        color: '#212121',
        lineHeight: 64,
    },
    hiddenView: {
        width:28,
        height:28,
    },
})

export default ChatHeaderApp;
