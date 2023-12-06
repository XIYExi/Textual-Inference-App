import React, {useCallback, useContext} from "react";
import {ChannelList, Search, useTheme} from "stream-chat-react-native";
import {chatClient, chatUserId, StreamChatGenerics} from "../chat/steam/chatConfig";
import {useAppContext} from "../../AppContext";
import {View, Text} from "@ant-design/react-native";
import {ChannelSort} from "stream-chat";
import {StyleSheet} from "react-native";
import {SearchContext} from "../../SearchContext";
import {MessageSearchList} from "./MessageSearchList";
import ThemeView from "../../components/ThemeView";

// 过滤
const filters = {
    members: {
        '$in': [chatUserId]
    },
    type: 'messaging',
};

const sort: ChannelSort = {
    last_message_at: -1,
};

const options = {
    presence: true,
    state: true,
    watch: true,
};

const additionalFlatListProps = {
    keyboardDismissMode: 'on-drag' as const,
    getItemLayout: (_: any, index: number) => ({
        index,
        length: 65,
        offset: 65 * index,
    }),
};

const ChannelListScreenApp: React.FC<any> = ({navigation}) => {

    const {setChannel, setChannelWithId} = useAppContext();
    const {searchQuery, loading, loadMore, messages, refreshing, refreshList} = useContext(SearchContext);

    const {
        theme: {
            colors: {grey, grey_gainsboro},
        },
    } = useTheme();


    const onSelect = useCallback(
        (channel: any) => {
            setChannel(channel);
            //console.log('select channel: -> ', channel);
            navigation.navigate('Main', {screen: 'Channel'});
        },
        [navigation, setChannel],
    );

    const EmptySearchIndicator = () => (
        <View style={styles.emptyIndicatorContainer}>
            <Search height={112} pathFill={grey_gainsboro} width={112} />
            <Text style={[styles.emptyIndicatorText, {color: grey}]}>
                {`No results for "${searchQuery}"`}
            </Text>
        </View>
    );


    return (
        <ThemeView style={StyleSheet.absoluteFill}>
            {(!!searchQuery || (messages && messages.length > 0)) && (
                <MessageSearchList
                    EmptySearchIndicator={EmptySearchIndicator}
                    loading={loading}
                    loadMore={loadMore}
                    messages={messages}
                    refreshing={refreshing}
                    refreshList={refreshList}
                    setChannelWithId={setChannelWithId}
                />
            )}
            <View style={{flex: searchQuery ? 0 : 1}}>
                <View
                    style={[styles.channelListContainer, {opacity: searchQuery ? 0 : 1}]}>
                    <ChannelList
                        additionalFlatListProps={additionalFlatListProps}
                        filters={filters}
                        HeaderNetworkDownIndicator={() => null}
                        maxUnreadCount={99}
                        onSelect={onSelect}
                        options={options}
                        sort={sort}
                    />
                </View>
            </View>
        </ThemeView>
    )
}

const styles = StyleSheet.create({
    channelListContainer: {
        height: '100%',
        position: 'absolute',
        width: '100%',
    },
    emptyIndicatorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
    emptyIndicatorText: {paddingTop: 28},
    flex: {
        flex: 1,
    },
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
        flex: 1,
        fontSize: 14,
        includeFontPadding: false, // for android vertical text centering
        padding: 0, // removal of default text input padding on android
        paddingHorizontal: 10,
        paddingTop: 0, // removal of iOS top padding for weird centering
        textAlignVertical: 'center', // for android vertical text centering
    },
});


export default ChannelListScreenApp;
