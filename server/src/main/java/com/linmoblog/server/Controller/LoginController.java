package com.linmoblog.server.Controller;

import com.linmoblog.server.Entity.Result;
import com.linmoblog.server.Entity.User;
import com.linmoblog.server.Entity.UserInfo;
import com.linmoblog.server.Service.LoginService;
import com.linmoblog.server.Utils.EncryptUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {
    @Autowired
    private LoginService loginService;

    @PostMapping("/api/login")
    public ResponseEntity<Result<String>> login(@RequestBody User user) {
        EncryptUtil.encrypt(user);
        return loginService.login(user);
    }

    @GetMapping("/api/public/user")
    public Result<UserInfo> userinfo() {
        return loginService.userinfo();
    }
}
