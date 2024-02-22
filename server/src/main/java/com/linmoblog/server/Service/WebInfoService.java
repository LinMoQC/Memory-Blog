package com.linmoblog.server.Service;

import com.linmoblog.server.Dao.WebInfoDao;
import com.linmoblog.server.Entity.Result;
import com.linmoblog.server.Entity.User;
import com.linmoblog.server.Entity.WebInfo;
import com.linmoblog.server.Utils.EncryptUtil;
import org.apache.ibatis.jdbc.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WebInfoService {
    @Autowired
    private WebInfoDao webInfoDao;

    public Result<Null> updateWebInfo(WebInfo webInfo) {
        User user = new User();
        user.setUsername(webInfo.getUserAccount());
        user.setPassword(webInfo.getUserPassword());
        EncryptUtil.encrypt(user);
        webInfoDao.updateWebInfo(webInfo,user);
        return new Result<>(200,"ok",null);
    }

    public Result<WebInfo> getWebInfo() {
        WebInfo webInfo = webInfoDao.getWebInfo();
        webInfo.setUserAccount(webInfo.getUserAccount());
        return new Result<>(200,"ok",webInfo);
    }
}
