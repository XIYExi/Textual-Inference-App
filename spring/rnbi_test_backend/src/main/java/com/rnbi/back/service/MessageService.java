package com.rnbi.back.service;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.rnbi.back.pojo.Message;
import com.rnbi.back.qo.MessageEachQuery;

import java.util.List;

public interface MessageService extends IService<Message> {


    public abstract List<Message> messageEachByPage(MessageEachQuery query);

}
