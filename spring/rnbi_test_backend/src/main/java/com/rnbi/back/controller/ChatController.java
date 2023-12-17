package com.rnbi.back.controller;

import com.rnbi.back.common.utils.R;
import com.rnbi.back.pojo.Message;
import com.rnbi.back.qo.ChannelsQuery;
import com.rnbi.back.qo.ChannelsReply;
import com.rnbi.back.qo.MessageEachQuery;
import com.rnbi.back.qo.UserSelectChannelQuery;
import com.rnbi.back.service.ChannelServiceImpl;
import com.rnbi.back.service.MessageServiceImpl;
import io.getstream.chat.java.exceptions.StreamException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("chat")
@CrossOrigin
public class ChatController {

    @Autowired
    private ChannelServiceImpl channelService;

    @Autowired
    private MessageServiceImpl messageService;

    @PostMapping("userSelectChannel")
    public R userSelectChannel(@RequestBody UserSelectChannelQuery query) throws StreamException {
        Map<String, Object> map = new HashMap<>();
        return R.ok().data("res", map);
    }


    @PostMapping("messageEach")
    public R messageEach(@RequestBody MessageEachQuery query) {
        Map<String, Object> map = new HashMap<>();

        List<Message> messageIPage = messageService.messageEachByPage(query);
        map.put("data", messageIPage);
        return R.ok().data("res", map);
    }

    @PostMapping("channelList")
    public R channelList(@RequestBody ChannelsQuery query) throws InterruptedException {
        String userId = query.getUserId();
        // System.err.println("print query: -> " + query.getSearchQuery());

        List<ChannelsReply> channelsPreview;
        if (isEmptyString(query.getSearchQuery()))
            channelsPreview = channelService.getChannelsPreviewWithoutSearch(userId,0, 0);
        else
            channelsPreview = channelService.getChannelsPreview(userId, query.getSearchQuery(),0, 0);
        Map<String,Object> map = new HashMap<>();
        map.put("data", channelsPreview);

        return R.ok().data("res", map);
    }


    boolean isEmptyString(String string) {
        return string == null || string.isEmpty() || string.trim().equals("");
    }
}
