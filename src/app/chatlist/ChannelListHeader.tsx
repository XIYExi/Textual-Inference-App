import React, {useContext, useCallback} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
} from 'react-native';

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


    const navigation = useNavigation();

    const {
        searchInputRef,
        searchInputText,
        setSearchInputText,
        setSearchQuery,
        setShouldReset,
    } = useContext(SearchContext);

    // 文本框输入的时候change的回调
    const onChangeText = useCallback(
        (text:string) => {
            setSearchInputText(text);
            if (!text) {
                setSearchQuery('');
                console.log('!')
            }
        },
        [setSearchInputText, setSearchQuery],
    );

    // 点击submit发送按钮的回调
    const onSubmitEditing = useCallback(
        /*@ts-ignore*/
        ({nativeEvent: {text}}) => {
            console.log('query: -> ',text)
            setSearchQuery(text);
        },
        [setSearchQuery],
    );

    const onClearInputText = useCallback(() => {
        setSearchInputText('');
        setSearchQuery('');
        searchInputRef.current?.blur();
        setShouldReset(true); // 需要重置
    }, [setShouldReset, searchInputRef, setSearchInputText, setSearchQuery]);

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
                    backgroundColor: '#fff', // white_snow
                    marginTop: 14,
                }}
            >
                {/*搜索条*/}
                <View style={[
                        styles.searchContainer,
                        {
                            backgroundColor: '#fff', // grey_whisper
                            borderColor: '#1C1E22',
                        },
                    ]}>

                    <TextInput
                        onChangeText={onChangeText}
                        onSubmitEditing={onSubmitEditing}
                        placeholder="Search"
                        placeholderTextColor={'#7A7A7A'}
                        ref={searchInputRef}
                        returnKeyType="search"
                        style={[styles.searchInput, {color: '#000'}]}
                        value={searchInputText}
                    />
                    {!!searchInputText && (
                        <TouchableOpacity onPress={onClearInputText}>
                            <Text>x</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/*新建对话*/}
                <View>
                    <TouchableOpacity onPress={onClickNewMessage}>
                        <Compose height={30} width={30} pathFill={'#005FFF'} />
                    </TouchableOpacity>
                </View>
            </Flex>
        </>
    );
};
