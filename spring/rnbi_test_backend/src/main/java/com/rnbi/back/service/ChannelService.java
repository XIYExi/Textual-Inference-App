package com.rnbi.back.service;


import com.baomidou.mybatisplus.extension.service.IService;
import com.rnbi.back.pojo.Channel;
import com.rnbi.back.qo.ChannelsReply;

import java.util.List;

public interface ChannelService extends IService<Channel> {


    public abstract List<ChannelsReply> getChannelsPreview(String userId, String searchQuery, Integer limit, Integer offset);

    public abstract List<ChannelsReply> getChannelsPreviewWithoutSearch(String userId, Integer limit, Integer offset);
}
