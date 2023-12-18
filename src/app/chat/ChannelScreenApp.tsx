import React, {FC, ReactNode, useEffect, useState} from "react";
import {Button, Flex, Modal, Text, View, WhiteSpace, WingBlank} from "@ant-design/react-native";
import {inject, observer} from "mobx-react";
import {useHeaderHeight} from '@react-navigation/elements';
import {HahaReaction} from "../../components/HahaReaction";
import {QuestionReaction} from "../../components/QuestionReaction";
import {ExclamationReaction} from "../../components/ExclamationReaction";
import {myMessageTheme} from "../theme";
import {SendButton} from "./SendButton";
import newWebSocket from "../../components/websocket/wensocketConfig";
import {port, wsUri} from "../../utils/port";
import {IUserStore, TChatUser} from "../../mobx/userStore";
import {IChatStore} from "../../mobx/chatStore";
import {useAppContext} from "../../AppContext";
import {Image, StyleSheet} from "react-native";
import ThemeText from "../../components/ThemeText";

interface IProps {
    channelId: string;

    userStore?: IUserStore;
    chatStore?: IChatStore;
}

interface IMessage {
    content: string;
    reply: string;
    [key:string]: any;
}


const ChannelScreenApp:FC<IProps> = (props:IProps) => {

    const headerHeight = useHeaderHeight();
    const [ws, setWs] = useState<WebSocket>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {userStore, chatStore} = props;


    let {userId} = useAppContext(); // 取出userId

    const channelId = chatStore?.channelId;
    const channelName = chatStore?.channelName;
    const chatUser = userStore?.getChannelUserMessage() || {id:'', name: '', avatar: ''};


    useEffect(() => {
        // 当ChannelScreenApp渲染时，需要完成两件事

        // 1. 与spring建立长连接，实时获得API返回的数据
        // API返回的数据在后端中插入数据库，但是在前端中是通过websocket取出来的
        newWebSocket(wsUri).then(res => {
            setWs(res);
        });

        // 2. 只有在页面首次挂载的时候才会请求数据库查询最近的五条对话数据
        // 当用户主动下拉刷新的时候，才会额外添加新的数据

        handleFetchMessageEach();
    }, [])

    const [messages, setMessages] = useState<IMessage[]>([]);

    // 每一次取出3条数据
    const handleFetchMessageEach = async () => {
        await fetch(`${port}/chat/messageEach`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                channelId: channelId,
                page: currentPage,
            }),
        })
            .then((response: any) => response.json())
            .then((data: any) => {
                const {res} = data.data;

                console.log(res.data)

                const _message = [...res.data, ...messages];

                setMessages(_message);
                setCurrentPage(prevState => prevState + 1); // 页数+1，下次获取的时候就可以直接获得最新的数据
            })
            .catch(err => {
                console.log(`【获取历史消息失败】 -> ${err}`);
            })
    }


    console.log('render前show一下：', chatUser);

    return (
        <View>

            {
                messages.length > 0 && messages.map((item: IMessage, index: number) => (
                    <View key={index} style={[{paddingVertical: 10}, ]}>
                        <View style={styles.questionWrapper}>
                            <Flex align='center'>
                                <View style={styles.imageContainer}>
                                    <Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} style={styles.chatAvatar}/>
                                </View>
                                <View style={styles.textContainer}>
                                    <ThemeText style={styles.userName}>{chatUser.name}</ThemeText>
                                    <ThemeText style={styles.question}>{item.content}</ThemeText>
                                </View>
                            </Flex>
                        </View>

                        <View style={styles.replyWrapper}>
                            <Flex align='center'>
                                <View style={styles.imageContainer}>
                                    <Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} style={styles.chatAvatar}/>
                                </View>
                                <View style={styles.textContainer}>
                                    <ThemeText style={styles.userName}>orange</ThemeText>
                                    <ThemeText style={styles.question}>{item.reply}</ThemeText>
                                </View>
                            </Flex>
                        </View>
                    </View>
                ))
            }

        </View>
    )

}


const styles = StyleSheet.create({
    imageContainer: {
        backgroundColor: 'rgba(0,0,0,.1)',
        borderRadius: 30,
        marginRight: 8,
    },
    chatAvatar: {
        width: 30,
        height: 30,
    },
    textContainer: {
        marginLeft: 3,
    },
    userName: {
        fontSize: 18,
        fontWeight: '500',
        fontStyle: 'normal',
    },
    question: {
        marginVertical: 5,
        fontSize: 15,
        fontWeight: '200',
        fontStyle: 'normal',

    },
    questionWrapper: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    replyWrapper: {
        paddingHorizontal: 20,
        backgroundColor: 'rgba(248,245,245,0.8)',
        paddingVertical: 16,
    }
})




export default inject('userStore', 'chatStore')(observer(ChannelScreenApp));
