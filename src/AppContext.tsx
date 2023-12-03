// 用于提供chat channel 存储不同对话的上下文

import React, { ReactNode, useCallback, useState} from 'react';
import {Channel as ChannelType, StreamChat} from 'stream-chat';
import {chatClient, StreamChatGenerics} from "./app/chat/steam/chatConfig";


type AppContextType = {
    chatClient: StreamChat<StreamChatGenerics>;
    channel: ChannelType<StreamChatGenerics> | undefined;
    setChannel: (channel: ChannelType<StreamChatGenerics>) => void;
    setChannelWithId: (channelId: string, messageId?: string) => Promise<void>;
    messageId?: string;
};

export const AppContext = React.createContext({} as AppContextType);

type State = {
    channel?: ChannelType;
    messageId?: string;
};


export const AppProvider = (props: {children: ReactNode}) => {
    const {children} = props;

    const [state, setState] = useState<State>({});
    const {channel, messageId} = state;

    const setChannelWithId = useCallback(
        async (channelId: string, innerMessageId?: string) => {
            const newChannel = chatClient?.channel('messaging', channelId);

            if (!newChannel?.initialized) {
                await newChannel?.watch();
            }
            console.log(channel, innerMessageId, 'nebebeh');
            setState({channel: newChannel, messageId: innerMessageId});
        },
        [],
    );

    const setChannel = useCallback(
        (newChannel: ChannelType) => setState({channel: newChannel}),
        [],
    );

    return (
        <AppContext.Provider
            value={{channel, setChannel, chatClient, setChannelWithId, messageId}}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => React.useContext(AppContext);
