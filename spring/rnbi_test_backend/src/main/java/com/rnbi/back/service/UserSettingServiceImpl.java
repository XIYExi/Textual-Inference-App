package com.rnbi.back.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.rnbi.back.mapper.UserSettingMapper;
import com.rnbi.back.pojo.UserSetting;
import org.springframework.stereotype.Service;


@Service
public class UserSettingServiceImpl extends ServiceImpl<UserSettingMapper, UserSetting> implements UserSettingService{
}
