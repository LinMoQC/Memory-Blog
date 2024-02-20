package com.linmoblog.server.Mapper;

import com.linmoblog.server.Entity.Image;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ImageMapper {

    @Insert("insert into images (image_url) value (#{imgUrl})")
    void upload(String imageUrl);

    @Delete("delete from images where image_url = #{imageUrl}")
    void delete(String imageUrl);

    @Select("select * from images")
    List<Image> getImages();
}
