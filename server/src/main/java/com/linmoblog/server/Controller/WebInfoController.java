package com.linmoblog.server.Controller;

import com.linmoblog.server.Entity.Result;
import com.linmoblog.server.Entity.WebInfo;
import com.linmoblog.server.Service.WebInfoService;
import org.apache.ibatis.jdbc.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebInfoController {
    @Autowired
    private WebInfoService webInfoService;

    @PostMapping("/api/protected/websetting")
    public Result<Null> updateWebInfo(@RequestBody WebInfo webInfo){
        return webInfoService.updateWebInfo(webInfo);
    }

    @GetMapping("/api/protected/websetting")
    public Result<WebInfo> getWebInfo(){
        return webInfoService.getWebInfo();
    }
}
