package com.rnbi.back.server;

import com.alibaba.fastjson2.JSON;
import com.rnbi.back.qo.WebsocketReplay;
import com.rnbi.back.qo.WebsocketUserQuery;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.atomic.AtomicInteger;

@Log4j2
@Component
@ServerEndpoint(value = "/ws")
public class WebSocketServer {

    // 与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;

    private static final AtomicInteger OnlineCount = new AtomicInteger(0);

    // concurrent包的线程安全Set，用来存放每个客户端对应的Session对象。
    private static CopyOnWriteArraySet<Session> SessionSet = new CopyOnWriteArraySet<Session>();


    /**
     * 这是最终调用的send方法，message最终出口！
     * 发送消息，实践表明，每次浏览器刷新，session会发生变化。
     * @param session
     * @param reply
     */
    public static void SendMessage(Session session, WebsocketReplay reply) {
        try {
            String message = JSON.toJSONString(reply);
            session.getBasicRemote().sendText(message);
        }
        catch (IOException e) {
            log.error("发出消息出错：{}", e.getMessage());
            e.printStackTrace();
        }
    }


    /**
     * 指定session发送消息
     * @param reply
     * @param sessionId
     * @throws IOException
     */
    public static void SendMessage(WebsocketReplay reply, String sessionId) {
        Session session = null;
        for (Session s : SessionSet) {
            if (s.getId().equals(sessionId)) {
                session = s;
                break;
            }
        }
        if (session != null) {
            SendMessage(session, reply);
        }
        else
            log.warn("没有找到你指定ID的会话：{}", sessionId);
    }


    /**
     * 连接建立成功调用的方法
     */
    @OnOpen
    public void onOpen(Session session) {
        SessionSet.add(session);
        this.session = session;
        int cut = OnlineCount.incrementAndGet(); // 在线数量+1
        log.info("有连接加入，当前连接数量为：{}", cut);

        WebsocketReplay query = new WebsocketReplay(){{this.setContent("success");this.setType(1);}};
        SendMessage(session, query);
    }


    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose(Session session) {
        SessionSet.remove(session);
        int cut = OnlineCount.decrementAndGet();
        log.info("有连接关闭，当前连接数量为： {}", cut);
    }



    /**
     * 收到客户端消息后调用的方法
     * @param message 客户端发送过来的消息
     */
    @OnMessage
    public void onMessage(String message, Session session) {
        log.info("来自客户端的消息：{}", message);

        WebsocketUserQuery query = JSON.parseObject(message, WebsocketUserQuery.class);


        String queryMsg = query.getContent();
        // TODO 调用API获得返回信息
        String returnMsg = "return msg ...";

        // 封装返回信息
        WebsocketReplay reply = new WebsocketReplay(){{this.setContent(returnMsg);this.setType(1);}};
        SendMessage(session, reply);
    }



    /**
     * 出现错误
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error) {
        log.error("发生错误： {}， Session ID： {}", error.getMessage(), session.getId());
        error.printStackTrace();
    }


    /**
     * 群发消息
     * @param message
     * @throws IOException
     */
    public static void BroadCastInfo(String message) {
        for (Session session : SessionSet) {
            if (session.isOpen()){
                WebsocketReplay replay = new WebsocketReplay(){{this.setContent(message);this.setType(1);}};

                SendMessage(session, replay);
            }
        }
    }

}
