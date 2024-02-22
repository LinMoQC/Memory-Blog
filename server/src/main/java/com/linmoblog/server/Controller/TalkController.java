package com.linmoblog.server.Controller;

import com.linmoblog.server.Entity.Talk;
import com.linmoblog.server.Entity.Result;
import com.linmoblog.server.Service.TalkService;
import org.apache.ibatis.jdbc.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(value = "/api")
@RestController
public class TalkController {
    @Autowired
    TalkService talkService;

    @PostMapping("/protect/talk")
    public Result<Null> addComment(@RequestBody Talk talk) {
        System.out.println(talk.toString());
        return talkService.addTalk(talk);
    }

    @GetMapping("/public/talk")
    public Result<List<Talk>> getTalkList() {
        return talkService.getTalkList();
    }

    @DeleteMapping("/protect/talk/{id}")
    public Result<Null> delTalk(@PathVariable Integer id){
        return talkService.del(id);
    }

    @PostMapping("/protect/talk/{id}")
    public Result<Null> updateTalk(@PathVariable Integer id,@RequestBody Talk talk){
        System.out.println(id + "  " + talk.toString());
        return talkService.updateTalk(id,talk);
    }
}
