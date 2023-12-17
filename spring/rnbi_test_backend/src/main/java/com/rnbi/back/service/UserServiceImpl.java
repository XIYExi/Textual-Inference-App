package com.rnbi.back.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.rnbi.back.mapper.UserMapper;
import com.rnbi.back.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService{

    @Autowired
    private UserMapper userMapper;


    /**
     * 0 表示 匹配成功
     * 1 表示 email错误
     * 2 表示 密码错误
     * @param email
     * @param password
     * @return
     */
    @Override
    public Object checkUser(String email, String password) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("email", email);

        User user = userMapper.selectOne(queryWrapper);

        return user == null ? 1 : (user.getPassword().equals(password) ? user : 2);
    }

    @Override
    public int selectByEmail(String email) {
        return userMapper.selectCount(new QueryWrapper<User>().eq("email", email));
    }


}
