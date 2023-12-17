package com.rnbi.back.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.rnbi.back.common.utils.R;
import com.rnbi.back.pojo.Setting;
import com.rnbi.back.pojo.User;
import com.rnbi.back.pojo.UserSetting;
import com.rnbi.back.qo.FillInQuery;
import com.rnbi.back.qo.LoginQuery;
import com.rnbi.back.qo.SettingQuery;
import com.rnbi.back.service.SettingServiceImpl;
import com.rnbi.back.service.UserServiceImpl;
import com.rnbi.back.service.UserSettingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("auth")
public class AuthController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private SettingServiceImpl settingService;

    @Autowired
    private UserSettingServiceImpl userSettingService;

    /**
     * 登录
     * @param query
     * @return
     */
    @PostMapping("login")
    public R login(@RequestBody LoginQuery query){
        System.out.println(query);
        String email = query.getEmail();
        String password = query.getPassword();

        Object res = userService.checkUser(email, password);
        Map<String, Object> map = new HashMap<>();

        if (res instanceof Integer) {
            switch ((int) res){
                case 1: {
                    List<String> list = new ArrayList<>();
                    Collections.addAll(list, "email", "password");
                    map.put("error", list);
                    break;
                }
                case 2: {
                    List<String> list = new ArrayList<>(){{add("password");}};
                    map.put("error", list);
                    break;
                }
                default:{
                    break;
                }
            }
        }
        else {
            // 否则返回的是User数据
            map.put("success", res);
        }

        return R.ok().data("res", map);
    }

    /**
     * 查询用户的预设设置（主题）
     * @param query
     * @return
     */
    @PostMapping("setting")
    public R setting(@RequestBody SettingQuery query) {
        Map<String, Object> map = new HashMap<>();

        Setting settingWithUserId = settingService.getSettingWithUserId(query.getId());

        if (settingWithUserId == null) {
            map.put("error", 0);
        }
        else {
            map.put("success", settingWithUserId);
        }

        return R.ok().data("res", map);
    }

    /**
     * 注册
     * @param query
     * @return
     */
    @PostMapping("register")
    public R register(@RequestBody LoginQuery query) {
        Map<String, Object> map = new HashMap<>();

        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("email", query.getEmail());

        int num = userService.selectByEmail(query.getEmail());
        // System.err.println(num);
        // 检验email是否唯一，唯一则返回 msg = "Email已经被注册"
        if(num > 0){
            map.put("error", "Email已经被注册");
            return R.ok().data("res", map);
        }

        User user = new User();
        user.setEmail(query.getEmail());
        user.setPassword(query.getPassword());
        boolean save = userService.save(user);


        // 更新setting表和user_setting关联表
        Setting setting = new Setting();
        setting.setMode(0); // 默认为Light

        boolean s = settingService.save(setting);

        UserSetting userSetting = new UserSetting();
        userSetting.setUserId(user.getId());
        userSetting.setSettingId(setting.getId());
        boolean us = userSettingService.save(userSetting);


        // 如果注册成功就返回新用的id，下一个页面中需要通过id更新新用户数据。
        Object o = (save && s && us) ? map.put("success", user.getId()) : map.put("error", "系统异常");
        return R.ok().data("res", map);
    }

    /**
     * 完善用户信息，更新
     * @param query
     * @return
     */
    @PostMapping("fillin")
    public R fillin(@RequestBody FillInQuery query) {
        Map<String, Object> map = new HashMap<>();
        boolean update = userService.updateById(query);
        if (update){
            map.put("success", 0);
            return R.ok().data("res", map);
        }
        map.put("error", "用户信息更新失败");
        return R.ok().data("res", map);
    }
}
