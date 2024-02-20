package com.linmoblog.server.Service;

import com.linmoblog.server.Dao.TalkDao;
import com.linmoblog.server.Entity.Talk;
import com.linmoblog.server.Entity.Result;
import org.apache.ibatis.jdbc.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TalkService {
    @Autowired
    private TalkDao talkDao;

    public Result<Null> addTalk(Talk talk) {
        talkDao.addTalk(talk);
        return new  Result<Null>(200,"ok",null);
    }

    public Result<List<Talk>> getTalkList() {
        List<Talk> talks = talkDao.getTalkList();
        return new Result<List<Talk>>(200,"ok", talks);
    }

    public Result<Null> del(int id) {
        talkDao.delTalk(id);
        return new Result<Null>(200,"ok");
    }

    public Result<Null> updateTalk(Integer id,Talk talk) {
        talkDao.updateTalk(id,talk);
        return new Result<>(200,"ok");
    }
}
