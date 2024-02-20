package com.linmoblog.server.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.linmoblog.server.Dao.TagDao;
import com.linmoblog.server.Entity.Result;
import com.linmoblog.server.Entity.TagLevelOne;
import com.linmoblog.server.Entity.TagLevelTwo;
import org.apache.ibatis.jdbc.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {
    @Autowired
    private TagDao tagDao;

    public Result<List<TagLevelOne>> getTagsOne() {
        List<TagLevelOne> result = tagDao.getTagsOne();
        return new Result<>(200,"ok", result);
    }

    public Result<List<TagLevelTwo>> getTagsTwo() {
        List<TagLevelTwo> result = tagDao.getTagsTwo();
        return new Result<>(200,"ok", result);
    }

    public Result<Null> addTagOne(TagLevelOne tagLevelOne) {
        tagDao.addTagOne(tagLevelOne);
        return new Result<>(200,"ok");
    }

    public Result<Null> addTagsTwo(TagLevelTwo tagLevelTwo) {
        tagDao.addTagTwo(tagLevelTwo);
        return new Result<>(200,"ok");
    }

    public Result<Null> deleteTags(List<Integer> tags) {
        for(Integer tag : tags){
            if(tag>100){
                tagDao.deleteTagTwo(tag);
            }else{
                tagDao.deleteTagOne(tag);
            }
        }
        return new Result<>(200,"ok");
    }
}
