package com.linmoblog.server.Dao;

import com.linmoblog.server.Entity.Image;
import com.linmoblog.server.Mapper.ImageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ImageDao {

    @Autowired
    private ImageMapper imageMapper;

    public void upload(String imageUrl) {
        imageMapper.upload(imageUrl);
    }

    public void deleteFile(String imageUrl) {
        imageMapper.delete(imageUrl);
    }

    public List<Image> getImages() {
        return imageMapper.getImages();
    }
}
