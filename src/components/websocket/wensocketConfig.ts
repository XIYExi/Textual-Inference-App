import {AppState} from "react-native";
import handleRespCodeStrategy from "./handleRespCodeStrategy";
import {closeWebsocket} from "./heartCheck";

export let websocketObj: {[key:string]: WebSocket} = {};

const newWebSocket = async (
    url:string,
    openCallback?:(param:WebSocket)=>void,
    messageCallback?:(e :WebSocketMessageEvent)=>void,
    closeCallback?:(e :WebSocketMessageEvent)=>void
) => {
    console.log('new webSocket...',websocketObj[url]);

    // 如果连接已经建立就返回
    if (websocketObj[url])
        return websocketObj[url];

    // 否则建立新的连接
    websocketObj[url] = new WebSocket(url);
    websocketObj[url].onopen = function () {
        // 成功建立后，重置心跳检测
        console.log('websocket connect!');

        // 如果有回调则执行
        if (openCallback)
            openCallback(websocketObj[url]);
        else {
            const content = JSON.stringify({content: 'hello', type: '0'});
            websocketObj[url].send(content);
        }

        console.log('connected successfully');
    };

    // 定义接受到消息的回调方法
    websocketObj[url].onmessage = function (e :WebSocketMessageEvent) {

        const message = JSON.parse(e.data);
        console.log(message)
        const {isSuccess, data, msgType, respCode} = message;

        // 根据响应码执行对应的处理
        if (respCode && handleRespCodeStrategy[respCode]) {
            handleRespCodeStrategy[respCode](url, openCallback, messageCallback, closeCallback);
            return;
        }

        // 执行回调
        if (messageCallback) {
            messageCallback(e);
            return;
        }

        if (isSuccess && data) {
            // 执行接收到消息的操作，分发actions执行操作
            // handleMsgMap[msgType](data);
            console.log('handleMsgMap', msgType, data);
        }
    };


    // 定义接收到服务端关闭连接时的回调方法
    websocketObj[url].onclose = function (e :WebSocketMessageEvent) {
        console.log('service onclose');
        closeCallback && closeCallback(e);
    }

    // 定义连接发生错误时的回调函数，连接发生错误时会继续尝试连接，间隔为30s
    websocketObj[url].onerror = function () {
        closeWebsocket(url);
        setTimeout(() => {
            newWebSocket(url, openCallback, messageCallback, closeCallback);
        }, 30000);
    }


    const _handleAppStateChange = (nextAppState: any) => {
        // 切换应用或者熄屏的时候nextAppState为background
        console.log('nextAppState', nextAppState)

        return websocketObj[url] && websocketObj[url].close();
    }

    AppState.addEventListener('change', _handleAppStateChange);

    return websocketObj[url];
}


export default newWebSocket;




