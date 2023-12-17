package com.rnbi.back.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.rnbi.back.mapper.ChannelMapper;
import com.rnbi.back.mapper.MessageMapper;
import com.rnbi.back.pojo.Channel;
import com.rnbi.back.qo.ChannelsReply;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChannelServiceImpl extends ServiceImpl<ChannelMapper, Channel> implements ChannelService{

    @Autowired
    private ChannelMapper channelMapper;

    @Autowired
    private MessageMapper messageMapper;


    @Override
    public List<ChannelsReply> getChannelsPreview(String userId, String searchQuery,Integer limit, Integer offset) {



        // 先查channel
        List<ChannelsReply> channelsPreview = channelMapper.getChannelsPreview(userId, searchQuery);
        for (ChannelsReply res : channelsPreview) {
            if (res.getMessage().length() > 12) {
                res.setMessage(res.getMessage().substring(0, 11) + "...");
            }
        }


        return channelsPreview;
    }

    @Override
    public List<ChannelsReply> getChannelsPreviewWithoutSearch(String userId, Integer limit, Integer offset) {
        // 先查channel
        List<ChannelsReply> channelsPreview = channelMapper.getChannelsPreviewWithoutSearch(userId);
        for (ChannelsReply res : channelsPreview) {
            if (res.getMessage().length() > 12) {
                res.setMessage(res.getMessage().substring(0, 11) + "...");
            }
        }


        return channelsPreview;
    }
}
