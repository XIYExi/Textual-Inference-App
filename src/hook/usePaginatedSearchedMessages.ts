import {useEffect, useRef, useState} from 'react';
import type {MessageFilters, MessageResponse} from 'stream-chat';

import {useAppContext} from "../AppContext";
import {port} from "../utils/port";

const MESSAGE_SEARCH_LIMIT = 10;

export interface IChannelListPreview {
    channelId: string;
    channelName: string;
    userId: string;
    message: string;
    time: string;
}



export function usePaginatedSearchedMessages(
    messageFilters: string | MessageFilters = {},
) {
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [messages, setMessages] = useState<string[]>();
    const offset = useRef(0);
    const hasMoreResults = useRef(true);
    const queryInProgress = useRef(false); // 请求中标识
    const {chatClient, userId} = useAppContext();

    // 请求完成
    const done = () => {
        queryInProgress.current = false;
        setLoading(false);
        setRefreshing(false);
    }

    // 请求重置
    const reset = () => {
        setMessages(undefined);
        offset.current = 0;
        hasMoreResults.current = true;
    }

    const fetchMessages = async () => {

        if (queryInProgress.current){
            done();
            return;
        }

        setLoading(true);

        try {
            queryInProgress.current = true;

            if (!hasMoreResults.current) {
                queryInProgress.current = false;
                done();
                return;
            }

            let response: IChannelListPreview[] = [];
            /**请求后端，获取封装好的channel信息*/
            await fetch(`${port}/chat/channelList`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-type':'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                }),
            })
                .then((response:any) => response.json())
                .then((data:any) => {
                    const {res} = data.data;
                    console.log('page',res.data)
                    response = res.data;
                })
                .catch(err => {
                    console.log(`【查询ChannelListPreview错误】 -> ${err}`);
                })
            // console.log('看看response', response)

            const newMessages = response.map(r => r.message); // reply列表
            // reply不存在，则表示没有新消息直接结束
            if (!newMessages) {
                queryInProgress.current = false;
                done();
                return;
            }

            // 有新消息
            let messagesLength = 0;
            if (offset.current === 0) {
                messagesLength = newMessages.length;
                setMessages(newMessages);
            } else {
                setMessages(existingMessages => {
                    if (!existingMessages) {
                        messagesLength = newMessages.length;
                        return newMessages;
                    }

                    const returnMessages = existingMessages.concat(newMessages);
                    messagesLength = returnMessages.length;
                    return returnMessages;
                });
            }

            if (newMessages.length < MESSAGE_SEARCH_LIMIT) {
                hasMoreResults.current = false;
            }

            offset.current = offset.current + messagesLength;
        } catch (e) {
            // TODO error...

        }
    }

    const loadMore = () => {
        fetchMessages();
    };

    useEffect(() => {
        reloadList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messageFilters]);


    const refreshList = () => {
        if (!chatClient?.user?.id) return;

        offset.current = 0;
        hasMoreResults.current = true;

        setRefreshing(true);
        fetchMessages();
    };

    const reloadList = () => {
        reset();

        setMessages([]);
        fetchMessages();
    };

    return {
        loading,
        loadMore,
        messages,
        refreshing,
        refreshList,
        reloadList,
        reset,
    };
}
