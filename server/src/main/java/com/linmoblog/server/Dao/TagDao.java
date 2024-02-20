package com.linmoblog.server.Dao;

import com.linmoblog.server.Entity.TagLevelOne;
import com.linmoblog.server.Entity.TagLevelTwo;
import com.linmoblog.server.Mapper.TagMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TagDao {
    @Autowired
    private TagMapper tagMapper;

    public List<TagLevelOne> getTagsOne() {
        return tagMapper.getTagsOne();
    }

    public List<TagLevelTwo> getTagsTwo() {
        return tagMapper.getTagsTwo();
    }

    public void addTagOne(TagLevelOne tagLevelOne) {
        tagMapper.addTagOne(tagLevelOne);
    }

    public void addTagTwo(TagLevelTwo tagLevelTwo) {
        tagMapper.addTagTwo(tagLevelTwo);
    }

    public void deleteTagTwo(Integer tag) {
        tagMapper.deleteTagTwo(tag);
    }

    public void deleteTagOne(Integer tag) {
        tagMapper.deleteTagOne(tag);
    }
}
