import React, {Dispatch, SetStateAction, useRef, useState} from 'react';
import {TextInput} from 'react-native';

import {usePaginatedSearchedMessages} from "./hook/usePaginatedSearchedMessages";


/**
 * 该上下文用于Channel List页面中Search框
 * 在ChannelListHeader和ChannelListScreenApp中传递消息
 * */
type SearchContextType = {
    searchInputRef: React.MutableRefObject<TextInput | null>;
    searchInputText: string;
    setSearchInputText: (text: string) => void;
    setSearchQuery: (text: string) => void;
    searchQuery: string;
    shouldReset: boolean;
    setShouldReset: Dispatch<SetStateAction<boolean>>;
};

export const SearchContext = React.createContext({} as SearchContextType);

export const SearchContextProvider: React.FC<any> = (props: any) => {

    const {children} = props;

    const searchInputRef = useRef<TextInput | null>(null);
    const [searchInputText, setSearchInputText] = useState(''); // channel list中search文本框的value
    const [searchQuery, setSearchQuery] = useState('');
    const [shouldReset, setShouldReset] = useState(false);

    // const searchProps = usePaginatedSearchedMessages(searchQuery);

    return (
        <SearchContext.Provider
            value={{
                searchInputRef,
                searchInputText,
                setSearchInputText,
                searchQuery,
                setSearchQuery,
                shouldReset,
                setShouldReset,
            }}>
            {children}
        </SearchContext.Provider>
    );
};
