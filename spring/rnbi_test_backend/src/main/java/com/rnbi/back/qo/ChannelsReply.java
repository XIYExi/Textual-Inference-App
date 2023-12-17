package com.rnbi.back.qo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChannelsReply {

    private String channelId; // 当前channel id

    private String channelName; // 当前channel name

    private String userId;

    // 因为是机器人对话，所以用户发了一条content一定会有reply
    // 这里直接取reply就可以，但是需要截取对话，暂定12个字符，超过用...替代作为预览
    private String message; // 当前channel中最后一条reply

    // 最后一条message的updateTime
    // 这里不是createTime！因为用户发送信息后需要经过服务器处理，可能有延迟，所以用户发过来的信息会先创建一条Message并保存
    // 当服务器完成对话之后，再把Message的reply字段更新！这个时候会修改updateTime！所以要保持最新
    private Date time;
}
