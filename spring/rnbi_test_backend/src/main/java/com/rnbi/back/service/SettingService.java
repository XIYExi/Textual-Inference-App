package com.rnbi.back.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.rnbi.back.pojo.Setting;

public interface SettingService extends IService<Setting> {

    public abstract Setting getSettingWithUserId(String userId);

}
