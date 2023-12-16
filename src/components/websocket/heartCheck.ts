/**
 * 心跳检测，每隔一段时间就检测连接状态，如果处于连接中，
 * 就像server端主动发送消息，来重置server和客户端的最大连接时间
 */
import newWebSocket, {websocketObj} from "./wensocketConfig";

const heartCheck:any = {
    timeout: 10000,
    serverTimeoutObj: null,
    reset: function () {
        clearInterval(this.serverTimeoutObj);
        this.serverTimeoutObj = null;
        return this;
    },
    start: function (
        url: string,
        openCallback: (param: WebSocket) => void,
        messageCallback: (param: WebSocketMessageEvent) => void,
        closeCallback: (param: WebSocketMessageEvent) => void
    ) {
        this.serverTimeoutObj = setInterval(() => {
            if (websocketObj[url].readyState === 1) {
                // 如果连接已经建立
                const content = JSON.stringify({ msgType: 1 });
                websocketObj[url].send(content);
            }
            else {
                // 否则先关闭当前请求，然后建立新的连接
                closeWebsocket(url);
                newWebSocket(url, openCallback, messageCallback, closeCallback);
            }
        }, this.timeout);
    },
};

export const closeWebsocket = (url:string) => {
    heartCheck.reset();
    websocketObj[url] && websocketObj[url].close();
    // @ts-ignore
    websocketObj[url] = null;
}

export default heartCheck;

