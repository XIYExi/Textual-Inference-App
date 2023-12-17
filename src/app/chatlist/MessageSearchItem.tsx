import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Right} from "../../components/Right";
import {IChannelListPreview} from "../../hook/usePaginatedSearchedMessages";
import ThemeText from "../../components/ThemeText";
import {Flex} from "@ant-design/react-native";

const styles = StyleSheet.create({

    contentContainer: {
        height: 60,
        flex: 1,
        borderBottomWidth: 1,
    },
    avatarContainer: {
        marginRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 5,
    },
    placeholderAvatar: {
        width: 42,
        height: 42,
        borderRadius: 100,
        backgroundColor: 'rgba(0, 0, 0, .5)',
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {fontSize: 14, fontWeight: '700', flex: 1, marginBottom: 3},
    circle: {
        width: 8,
        height: 8,
        borderRadius: 50,
        alignSelf: 'center',
        marginRight: 10,
    },
    circleFill: {
        backgroundColor: '#147EFB',
    },

    date: {
        fontSize: 12,
        marginLeft: 2,
        textAlign: 'right',
    },
    detailsText: {fontSize: 12},
    flex: {flex: 1},
    indicatorContainer: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
    },
    itemContainer: {
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 12,
    },
    message: {
        flexShrink: 1,
        fontSize: 12,
    },
    titleContainer: {
        maxWidth: 80 - 16 - 40,
    },
    svg: {
        maxWidth: 16,
        maxHeight: 16,
    },
    messageItemContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginLeft: 10,
        marginRight: 5,
        marginBottom: 12,
    },
    channelMessageContainer: {
        marginLeft: 8,

    },
    channelItemTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    channelItemReply: {
        fontWeight: '300',
        fontSize: 12,
    },
});

type MessageSearchListProps = {
    item: IChannelListPreview;
};

export const MessageSearchItem: React.FC<MessageSearchListProps> = ({item}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => {

                //@ts-ignore
                navigation.navigate('Channel', {id: item.channelId});
            }}
            testID="channel-preview-button">
            <View id={item.userId} style={styles.messageItemContainer}>
                <Flex justify='between' align='start'>
                    <View>
                        <Flex justify='start' align='center'>
                            <View style={styles.placeholderAvatar}>

                            </View>
                            <View style={styles.channelMessageContainer}>
                                <ThemeText
                                    style={styles.channelItemTitle}>{item.channelName}</ThemeText>
                                <ThemeText
                                    style={styles.channelItemReply}>{item.message}</ThemeText>
                            </View>
                        </Flex>
                    </View>
                    <View>
                        <Text>{item.time.toString()}</Text>
                    </View>
                </Flex>
            </View>
        </TouchableOpacity>
    );
};
