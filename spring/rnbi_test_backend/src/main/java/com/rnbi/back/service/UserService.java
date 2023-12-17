package com.rnbi.back.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.rnbi.back.pojo.User;

public interface UserService extends IService<User> {


    public abstract Object checkUser(String email, String password);


    public abstract int selectByEmail(String email);
}
