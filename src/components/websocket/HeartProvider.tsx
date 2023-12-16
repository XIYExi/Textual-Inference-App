import React, {createContext, Dispatch, SetStateAction, useContext, useEffect, useRef, useState} from "react";
import {wsUri} from "../../utils/port";
import newWebSocket from "./wensocketConfig";
import * as url from "url";


/**
 * 长连接还是应该在App启动的时候初始化，
 * 用户需要在登录之后就可以查看之前的对话是否处理完成
 * @param props
 * @constructor
 */
function HeartProvider(props:any) {

    const {children} = props;

    const [serverState, setServerState] = useState('Loading...');
    const [disableButton, setDisableButton] = useState(true);
    const [serverMessages, setServerMessages] = useState<string[]>([]);




    const websocketValue = {

        serverState,

        disableButton,
        setDisableButton,

        serverMessages,
    }


    return (
        <React.Fragment>
            <WebSocketContext.Provider value={websocketValue}>
                {children}
            </WebSocketContext.Provider>
        </React.Fragment>
    )
}

interface IWebSocketContext{
    serverState: string;
    disableButton: boolean;
    setDisableButton:Dispatch<SetStateAction<boolean>>;
    serverMessages: string[];
}

const WebSocketContext = createContext<Partial<IWebSocketContext>>({});

export const useWebSocketContext = () => useContext(WebSocketContext) as unknown as Partial<IWebSocketContext>;


export default HeartProvider;
