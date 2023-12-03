import {useEffect, useRef, useState} from 'react';
import type {MessageFilters, MessageResponse} from 'stream-chat';

import {useAppContext} from "../AppContext";

const MESSAGE_SEARCH_LIMIT = 10;

export function usePaginatedSearchedMessages(
    messageFilters: string | MessageFilters = {},
) {
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [messages, setMessages] = useState<MessageResponse[]>();
    const offset = useRef(0);
    const hasMoreResults = useRef(true);
    const queryInProgress = useRef(false);
    const {chatClient} = useAppContext();

    const done = () => {
        queryInProgress.current = false;
        setLoading(false);
        setRefreshing(false);
    }


    const reset = () => {
        setMessages(undefined);
        offset.current = 0;
        hasMoreResults.current = true;
    }

    const fetchMessages = async () => {
        if (!messageFilters){
            reset();
            done();
            return;
        }

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
            const res = await chatClient?.search(
                {
                    members: {
                        $in: [chatClient?.user?.id || null],
                    },
                },
                messageFilters,
                {
                    limit: MESSAGE_SEARCH_LIMIT,
                    offset: offset.current,
                },
            );

            const newMessages = res?.results.map(r => r.message);
            if (!newMessages) {
                queryInProgress.current = false;
                done();
                return;
            }

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
