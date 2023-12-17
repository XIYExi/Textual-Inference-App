package com.rnbi.back.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.rnbi.back.mapper.MessageMapper;
import com.rnbi.back.pojo.Message;
import com.rnbi.back.qo.MessageEachQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl extends ServiceImpl<MessageMapper, Message> implements MessageService{

    @Autowired
    private MessageMapper messageMapper;


    @Override
    public List<Message> messageEachByPage(MessageEachQuery query) {
        Integer currentPage = query.getPage();
        String channelId = query.getChannelId();

        QueryWrapper<Message> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("channelId", channelId).orderByAsc("createTime");

        Page<Message> page = new Page<>(currentPage, 3L);
        messageMapper.selectPage(page, queryWrapper);

        List<Message> records = page.getRecords();
        return records;
    }
}
