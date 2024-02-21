package com.linmoblog.server.Service;

import com.linmoblog.server.Dao.LoginDao;
import com.linmoblog.server.Entity.Result;
import com.linmoblog.server.Entity.User;
import com.linmoblog.server.Entity.UserInfo;
import com.linmoblog.server.Utils.JWTTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    private LoginDao loginDao;

    public Result<String> login(User user) {
        User res = loginDao.login(user);
        if(res != null) {
            String token = JWTTokenUtil.CreateToken("admin");
            return new Result<String>(200, "Login successful", token);
        }
        return new Result<>(401, "Login failed",null);
    }

    public Result<UserInfo> userinfo() {
        return loginDao.userinfo();
    }
}
