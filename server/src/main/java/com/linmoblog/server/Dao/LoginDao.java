package com.linmoblog.server.Dao;

import com.linmoblog.server.Entity.Result;
import com.linmoblog.server.Entity.User;
import com.linmoblog.server.Mapper.LoginMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class LoginDao {
    @Autowired
    private LoginMapper loginMapper;

    public User login(User user){
        return loginMapper.login(user);
    }

    public Result<User> userinfo() {
        User res = loginMapper.userinfo();
        return new Result<User>(200,"ok",res);
    }
}
