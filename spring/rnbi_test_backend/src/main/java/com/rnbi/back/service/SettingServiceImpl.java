package com.rnbi.back.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.rnbi.back.mapper.SettingMapper;
import com.rnbi.back.pojo.Setting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SettingServiceImpl extends ServiceImpl<SettingMapper, Setting> implements SettingService{

    @Autowired
    private SettingMapper settingMapper;

    @Override
    public Setting getSettingWithUserId(String userId) {

        return settingMapper.getSettingWithUserId(userId);
    }
}
