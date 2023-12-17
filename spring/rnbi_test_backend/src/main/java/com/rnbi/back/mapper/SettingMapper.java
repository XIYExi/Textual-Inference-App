package com.rnbi.back.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.rnbi.back.pojo.Setting;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface SettingMapper extends BaseMapper<Setting> {

    @Select("<script>" +
            "select * from `setting` where id = (select settingId from `user_setting` where userId = '${userId}')" +
            "</script>")
    public Setting getSettingWithUserId(String userId);
}
