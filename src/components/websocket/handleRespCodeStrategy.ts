import newWebSocket, {websocketObj} from "./wensocketConfig";
import heartCheck, {closeWebsocket} from "./heartCheck";


/**
 * 处理对应的状态码
 *
 * 1001 ： 重新连接
 * 1002 ： 关闭心跳定时器
 * 1003 ： 重新登陆 跳转login
 * 1004 ： 关闭websocket
 * 1005 ： 失败，保持不动
 */
const handleRespCodeStrategy: any = {
    1001: function (
        url: string,
        openCallback: (param:WebSocket) => void,
        messageCallback: (e :WebSocketMessageEvent) => void,
        closeCallback: () => void
    ) {
        // @ts-ignore
        websocketObj[url] && closeWebsocket(url) && newWebSocket(url, openCallback, messageCallback, closeCallback);
    },
    1002: function () {
        heartCheck.reset();
    },
    1003: function (url:string) {
        closeWebsocket(url);
        console.log('')
    },
    1004: function (url:string) {
        closeWebsocket(url);
    },
    9999: () => {}
};


export default handleRespCodeStrategy;
