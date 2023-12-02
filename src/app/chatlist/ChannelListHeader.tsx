import React, {useContext, useCallback} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
} from 'react-native';

import {Search, useTheme, CircleClose} from 'stream-chat-react-native';
import {useNavigation} from '@react-navigation/native';

import {SearchContext} from "../../SearchContext";
import {Compose} from "../../components/Compose";
import {Flex} from "@ant-design/react-native";

export const CHANNEL_LIST_SCREEN_HEADER_HEIGHT = 80;

const styles = StyleSheet.create({
    searchContainer: {
        alignItems: 'center',
        borderRadius: 30,
        borderWidth: 1,
        flexDirection: 'row',
        margin: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    searchInput: {
        width: '75%',
        fontSize: 14,
        includeFontPadding: false, // for android vertical text centering
        padding: 0, // removal of default text input padding on android
        paddingHorizontal: 10,
        paddingTop: 0, // removal of iOS top padding for weird centering
        textAlignVertical: 'center', // for android vertical text centering
    },
});

export const ChannelListHeader = () => {
    const {
        theme: {
            colors: {black, grey, grey_whisper, white_snow, accent_blue},
        },
    } = useTheme();

    const navigation = useNavigation();

    const {
        searchInputRef,
        searchInputText,
        setSearchInputText,
        setSearchQuery,
        reset,
    } = useContext(SearchContext);

    const onChangeText = useCallback(
        (text:string) => {
            setSearchInputText(text);
            if (!text) {
                reset();
                setSearchQuery('');
            }
        },
        [reset, setSearchInputText, setSearchQuery],
    );

    const onSubmitEditing = useCallback(
        /*@ts-ignore*/
        ({nativeEvent: {text}}) => {
            setSearchQuery(text);
        },
        [setSearchQuery],
    );

    const onClearInputText = useCallback(() => {
        setSearchInputText('');
        setSearchQuery('');
        searchInputRef.current?.blur();
        reset();
    }, [reset, searchInputRef, setSearchInputText, setSearchQuery]);

    const onClickNewMessage = () => {
        // return navigation.navigate('NewMessage');
    };

    return (
        <>
            <Flex
                wrap='nowrap'
                justify='around'
                align='center'
                style={{
                    backgroundColor: white_snow,
                    marginTop: 14,
                }}
            >
                <View style={[
                        styles.searchContainer,
                        {
                            backgroundColor: grey_whisper,
                            borderColor: grey_whisper,
                        },
                    ]}>
                    <Search width={18} pathFill={grey} />
                    <TextInput
                        onChangeText={onChangeText}
                        onSubmitEditing={onSubmitEditing}
                        placeholder="Search"
                        placeholderTextColor={grey}
                        ref={searchInputRef}
                        returnKeyType="search"
                        style={[styles.searchInput, {color: black}]}
                        value={searchInputText}
                    />
                    {!!searchInputText && (
                        <TouchableOpacity onPress={onClearInputText}>
                            <CircleClose pathFill={grey} />
                        </TouchableOpacity>
                    )}
                </View>

                <View>
                    <TouchableOpacity onPress={onClickNewMessage}>
                        <Compose height={30} width={30} pathFill={accent_blue} />
                    </TouchableOpacity>
                </View>
            </Flex>
        </>
    );
};
