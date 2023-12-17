import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {ChannelList, Search, useTheme} from "stream-chat-react-native";
import {chatUserId} from "../chat/steam/chatConfig";
import {useAppContext} from "../../AppContext";
import {View, Text, Flex} from "@ant-design/react-native";
import {ChannelSort} from "stream-chat";
import {ScrollView, StyleSheet} from "react-native";
import {SearchContext} from "../../SearchContext";
import ThemeView from "../../components/ThemeView";
import {port} from "../../utils/port";
import {IChannelListPreview} from "../../hook/usePaginatedSearchedMessages";
import ThemeText from "../../components/ThemeText";
import {MessageSearchList} from "./MessageSearchList";

const additionalFlatListProps = {
    keyboardDismissMode: 'on-drag' as const,
    getItemLayout: (_: any, index: number) => ({
        index,
        length: 65,
        offset: 65 * index,
    }),


};


const MESSAGE_SEARCH_LIMIT = 10;

const ChannelListScreenApp: React.FC<any> = ({navigation}) => {

    const { userId} = useAppContext();
    const {searchQuery, shouldReset, setShouldReset} = useContext(SearchContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const offset = useRef(0);
    const queryInProgress = useRef(false); // 请求中标识
    const [empty, setEmpty] = useState(false); // 空列表标识

    const [messages, setMessages] = useState<IChannelListPreview[]>([]);


    // 请求完成
    const done = () => {
        queryInProgress.current = false;
        setLoading(false);
        setRefreshing(false);
    }

    const reloadList = () => {
        setShouldReset(true);

        setMessages([]);
        getChannelListPreview();
    };

    // 初始化，第一次直接请求所有数据
    useEffect(() => {
        console.log('?')
        reloadList();
    }, [searchQuery]);

    const loadMore = () => {
        getChannelListPreview();
    };

    const refreshList = () => {

        offset.current = 0;

        setRefreshing(true);
        getChannelListPreview();
    };



    /**请求后端，获取封装好的channel信息*/
    const getChannelListPreview = async () => {
        // 如果上一次查询还没有结束，用户有进行了新的查询那么就取消上一次结果，查新的内容
        if (queryInProgress.current){
            done();
            return;
        }

        setLoading(true);

        try{
            queryInProgress.current = true;

            await fetch(`${port}/chat/channelList`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-type':'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    searchQuery: searchQuery,
                }),
            })
                .then((response:any) => response.json())
                .then((data:any) => {
                    const {res} = data.data;
                    //console.log('page',res.data)
                    // 处理日期
                    const raw_data = res.data;

                    if (raw_data.length === 0)
                        setEmpty(true);
                    else
                        setEmpty(false);

                    const new_data = raw_data.map((item: IChannelListPreview, index:number) => {
                        const date = new Date(item.time);
                        const year = date.getFullYear(); // 年
                        const month = date.getMonth() + 1; //月
                        const day = date.getDate(); // 日

                        const sys = new Date();// 当前时间
                        if (sys.getFullYear() === year && (sys.getMonth()+1) === month && sys.getDate() == day){
                            // 记录的年月日和当前本地一样，说明是今天的消息，那么只显示时间
                            return {...item, time: `${date.getHours()}:${date.getMinutes()}`};
                        }
                        else {
                            // 如果时间不是今天，那么就只显示日期： 月-日
                            return {...item, time: `${month}-${day}`};
                        }
                    })
                    return new_data
                })
                .then(res => {
                    console.log('response', res)

                    setMessages(res);
                    done();
                })
                .catch(err => {
                    console.log(`【查询ChannelListPreview错误】 -> ${err}`);
                })
        }
        catch (e) {
            //TODO error...
            console.log('【ChannelListScreenApp】:fetch channel list data error... -> ', e);
        }
    }

    const handleUserSelectChannel = async (channelId: string, channelName: string) => {
        await fetch(`${port}/chat/userSelectChannel`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                channelId: channelId,
                channelName: channelName,
            }),
        })
            .then((response:any) => response.json())
            .then((data:any) => {
                const {res} = data.data;
                console.log('Channel select: -> ', res);
            })
            .catch(err => {
                console.log(`【用户选择Channel异常】 -> ${err}`);
            })
    }

    const EmptySearchIndicator = () => (
        <View style={styles.emptyIndicatorContainer}>
            <Search height={112} pathFill={'#2D2F2F'} width={112} />
            <Text style={[styles.emptyIndicatorText, {color: '#7A7A7A'}]}>
                {`没有查询到关于 "${searchQuery}" 的记录`}
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
                    empty={empty}
                />
            )}
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

    loading: {
        width: '100%',
        height: '100%',
        minHeight: '100%',
        zIndex: 9999,
        backgroundColor:'rgba(0,0,0,.1)',
    }

});


export default ChannelListScreenApp;
