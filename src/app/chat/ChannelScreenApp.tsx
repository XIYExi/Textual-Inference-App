import React, {FC, ReactNode, useEffect, useState} from "react";
import {Button, Flex, Modal, Text, View, WhiteSpace, WingBlank} from "@ant-design/react-native";
import {inject, observer} from "mobx-react";
import {useHeaderHeight} from '@react-navigation/elements';
import {HahaReaction} from "../../components/HahaReaction";
import {QuestionReaction} from "../../components/QuestionReaction";
import {ExclamationReaction} from "../../components/ExclamationReaction";
import {myMessageTheme} from "../theme";
import InputButton from "./InputButton";
import {SendButton} from "./SendButton";
import newWebSocket from "../../components/websocket/wensocketConfig";
import {port, wsUri} from "../../utils/port";

interface IProps {
    channelId: string;
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
    const {channelId} = props;


    const userId = 'usisjanz';
    const channelName = 'test1';

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

    const handleFetchMessageEach = async () => {
        await fetch(`${port}/chat/messageEach`,{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                channelId: channelId,
                page: currentPage,
            }),
        })
            .then((response:any) => response.json())
            .then((data:any) => {
                const {res} = data.data;

                console.log(res.data)

                const _message = [...res.data, ...messages];

                setMessages(_message);
                setCurrentPage(prevState =>  prevState + 1); // 页数+1，下次获取的时候就可以直接获得最新的数据
            })
            .catch(err => {
                console.log(`【获取历史消息失败】 -> ${err}`);
            })
    }



    return (
        <View>

            {
                messages.length > 0 && messages.map((item:IMessage, index:number) => (
                    <View key={index} style={{paddingVertical: 10, paddingHorizontal: 20}}>
                        <View>
                            <Text>User</Text>
                            <Text>{item.content}</Text>
                        </View>


                        <View>
                            <Text>Orange</Text>
                            <Text>{item.reply}</Text>
                        </View>
                    </View>
                ))
            }


        </View>
    )

}

export default ChannelScreenApp;
