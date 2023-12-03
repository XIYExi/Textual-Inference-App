import React, {FC, ReactNode, useEffect, useState} from "react";
import {Button, Flex, Modal, Text, View, WhiteSpace, WingBlank} from "@ant-design/react-native";
import {inject, observer} from "mobx-react";
import {IChatStore} from "../../mobx/chatStore";
import {Image, StyleSheet, Pressable} from "react-native";
import Loading from "./component/loading";
import ChatContainerApp from "./ChatContainerApp";
import {
    Channel as StreamChannel,
    ChannelProps,
    LoveReaction,
    ThumbsDownReaction,
    ThumbsUpReaction
} from "stream-chat-react-native";
import {useAppContext} from "../../AppContext";
import {useHeaderHeight} from '@react-navigation/elements';
import {HahaReaction} from "../../components/HahaReaction";
import {QuestionReaction} from "../../components/QuestionReaction";
import {ExclamationReaction} from "../../components/ExclamationReaction";
import {myMessageTheme} from "../theme";
import InputButton from "./InputButton";
import {SendButton} from "./SendButton";

interface IProps {
    chatStore: IChatStore;
}

const SUPPORTED_REACTIONS = [
    {
        Icon: LoveReaction,
        type: 'love',
    },
    {
        Icon: ThumbsUpReaction,
        type: 'like',
    },
    {
        Icon: ThumbsDownReaction,
        type: 'sad',
    },
    {
        Icon: HahaReaction,
        type: 'hahaha',
    },
    {
        Icon: QuestionReaction,
        type: 'question',
    },
    {
        Icon: ExclamationReaction,
        type: 'exclamation',
    },
];

const ChannelScreenApp:FC<ChannelProps> = (props:ChannelProps) => {


    const {channel, messageId} = useAppContext();
    const headerHeight = useHeaderHeight();

    return (
        <StreamChannel
            MessageReplies={() => null}
            messageId={messageId}
            messageActions={({isMyMessage, copyMessage, deleteMessage}:any) => {
                const acceptedActions = [copyMessage];
                if (isMyMessage)
                    acceptedActions.push(deleteMessage);
                return acceptedActions;
            }}
            supportedReactions={SUPPORTED_REACTIONS}
            myMessageTheme={myMessageTheme}
            keyboardVerticalOffset={headerHeight}
            MessageAvatar={() => null}
            enforceUniqueReaction
            allowThreadMessagesInChannel={false}
            InputButtons={InputButton}
            SendButton={SendButton}
            {...props}
        >
            {/*对话主容器*/}
            <ChatContainerApp />
        </StreamChannel>
    )

}

export default ChannelScreenApp;
