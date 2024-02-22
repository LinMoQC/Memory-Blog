package com.linmoblog.server.Dao;

import com.linmoblog.server.Entity.User;
import com.linmoblog.server.Entity.WebInfo;
import com.linmoblog.server.Mapper.WebInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class WebInfoDao {
    @Autowired
    private WebInfoMapper webInfoMapper;

    public void updateWebInfo(WebInfo webInfo, User user) {
        webInfoMapper.updateWebInfo(webInfo);
        webInfoMapper.updateLogin(user);
    }

    public WebInfo getWebInfo() {
        return webInfoMapper.getWebInfo();
    }
}
