package com.rnbi.back.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.rnbi.back.pojo.Message;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MessageMapper extends BaseMapper<Message> {
}
