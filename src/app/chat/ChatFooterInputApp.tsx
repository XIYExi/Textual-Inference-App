import {Button, Flex, InputItem, View} from "@ant-design/react-native";
import {Image, StyleSheet} from "react-native";
import React from "react";


function ChatFooterInputApp() {

    return (
        <Flex style={styles.inputWrapper} align='center'>
            <View style={styles.inputs}>
                <InputItem
                    onChange={(value: any) => {}}
                    placeholder="问我任何事..."
                    type='text'
                />
            </View>
            <Button style={styles.button} activeStyle={{backgroundColor: '#17CE92',opacity: 0.8}}>
                <Image
                    source={require('../../assets/chat/submit.png')}
                    style={styles.submitIcon}
                />
            </Button>
        </Flex>
    )
}

const styles = StyleSheet.create({
    inputWrapper: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        marginBottom: 24,
    },
    inputs: {
        width: '80%',
        backgroundColor: 'rgba(158, 158,158, 0.1)',
        borderRadius: 16,
        gap: 12,
        alignItems: 'center',
    },
    buttonWrapper: {
        width: '20%',
    },
    button: {
        width: 52,
        height: 52,
        borderRadius: 100,
        backgroundColor: '#17CE92',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginLeft: 10,
    },
    submitIcon: {
        width: 24,
        height: 24,
    },
})


export default ChatFooterInputApp
