import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback, Image, Pressable} from 'react-native';
import {isOwnUser} from 'stream-chat';
import {
    ChannelAvatar,
    useChannelPreviewDisplayName,
    useTheme,
} from 'stream-chat-react-native';
import type {Channel as ChannelType} from 'stream-chat';
import {NavigationParamsList} from "../Apps";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useAppContext} from "../../AppContext";
import {BackButton} from "../../components/BackButton";
import {Flex} from "@ant-design/react-native";
import {inject, observer} from "mobx-react";
import {IChatStore} from "../../mobx/chatStore";

export const CHANNEL_SCREEN_HEADER_HEIGHT = 80;

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
        paddingHorizontal: 8,
        paddingVertical: 15,
        flex: 1,
    },
    leftContainer: {
        flex: 1,
    },
    backButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    counterBadge: {
        borderRadius: 20,
        paddingHorizontal: 5,
    },
    rightContainer: {
        flex: 1,
    },
    middleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    text: {
        fontSize: 12,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});

export type ChannelHeader = {
    channel?: ChannelType;
    navigation: NativeStackNavigationProp<NavigationParamsList, 'Main'>;
    chatStore:IChatStore;
};

const ChannelHeader: React.FC<ChannelHeader> = ({channel, navigation,chatStore}) => {
    const displayName = useChannelPreviewDisplayName(channel);
    const [count, setCount] = useState<number>();

    return (
        <>
            <View style={[styles.container]}>
                <View style={[styles.middleContainer]}>
                    <View style={styles.leftContainer}>
                        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                            <View style={styles.backButtonContainer}>
                                <BackButton pathFill={'#005FFF'} width={22} />
                                {count ? (
                                    <View
                                        style={[
                                            styles.counterBadge,
                                            {backgroundColor: '#005FFF'},
                                        ]}>
                                        <Text style={{color: '#fff'}}>{count}</Text>
                                    </View>
                                ) : null}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    {/*TODO 用户头像*/}
                    {/*{channel && <ChannelAvatar channel={channel} />}*/}


                    <Flex style={styles.rightContainer} justify='end'>
                        <View style={{marginRight: 20}}>
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
                        </View>
                    </Flex>
                </View>
                <Text style={[styles.text]}>{displayName}</Text>
            </View>
        </>
    );
}


export default inject('chatStore')(observer(ChannelHeader));
