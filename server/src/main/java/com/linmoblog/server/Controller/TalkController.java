package com.linmoblog.server.Controller;

import com.linmoblog.server.Entity.Talk;
import com.linmoblog.server.Entity.Result;
import com.linmoblog.server.Service.TalkService;
import org.apache.ibatis.jdbc.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(value = "/api/protect/talk")
@RestController
public class TalkController {
    @Autowired
    TalkService talkService;

    @PostMapping
    public Result<Null> addComment(@RequestBody Talk talk) {
        System.out.println(talk.toString());
        return talkService.addTalk(talk);
    }

    @GetMapping
    public Result<List<Talk>> getTalkList() {
        return talkService.getTalkList();
    }

    @DeleteMapping("/{id}")
    public Result<Null> delTalk(@PathVariable Integer id){
        return talkService.del(id);
    }

    @PostMapping("/{id}")
    public Result<Null> updateTalk(@PathVariable Integer id,@RequestBody Talk talk){
        System.out.println(id + "  " + talk.toString());
        return talkService.updateTalk(id,talk);
    }
}
