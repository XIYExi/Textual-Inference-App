package com.rnbi.back.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.rnbi.back.pojo.Channel;
import com.rnbi.back.qo.ChannelsReply;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ChannelMapper extends BaseMapper<Channel> {


    @Select("<script>" +
            "select channel.id as channelId, channel.name as channelName, channel.userId as userId, message.reply as message, message.updateTime as time " +
            "from channel, message where message.updateTime in (select max(updateTime) as updateTime from message group by message.channelId) " +
            "and channel.userId='${userId}' and message.channelId=channel.id and channel.name like concat('%', '${searchQuery}', '%') order by time desc" +
            "</script>")
    List<ChannelsReply> getChannelsPreview(String userId, String searchQuery);

    @Select("<script>" +
            "select channel.id as channelId, channel.name as channelName, channel.userId as userId, message.reply as message, message.updateTime as time " +
            "from channel, message where message.updateTime in (select max(updateTime) as updateTime from message group by message.channelId) " +
            "and channel.userId='${userId}' and message.channelId=channel.id order by time desc" +
            "</script>")
    List<ChannelsReply> getChannelsPreviewWithoutSearch(String userId);
}
