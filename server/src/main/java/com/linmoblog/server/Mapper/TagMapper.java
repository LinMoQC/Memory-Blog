package com.linmoblog.server.Mapper;

import com.linmoblog.server.Entity.TagLevelOne;
import com.linmoblog.server.Entity.TagLevelTwo;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface TagMapper {

    @Select("select * from tag_level_1")
    List<TagLevelOne> getTagsOne();

    @Select("select * from tag_level_2")
    List<TagLevelTwo> getTagsTwo();

    @Insert("insert into tag_level_1 (title,color) values (#{title},#{color})")
    void addTagOne(TagLevelOne tagLevelOne);

    @Insert("insert into tag_level_2 (tag_key,title,color,father_tag) values (#{tagKey},#{title},#{color},#{fatherTag})")
    void addTagTwo(TagLevelTwo tagLevelTwo);

    @Delete("delete from tag_level_2 where tag_key = #{tag}")
    void deleteTagTwo(Integer tag);

    @Delete("delete from tag_level_1 where tag_key = #{tag}")
    void deleteTagOne(Integer tag);
}
