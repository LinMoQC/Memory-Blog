package com.linmoblog.server.Service;

import com.linmoblog.server.Dao.ImageDao;
import com.linmoblog.server.Entity.Image;
import com.linmoblog.server.Entity.Result;
import org.apache.ibatis.jdbc.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService {
    @Autowired
    private ImageDao imageDao;

    public Result<String> upload(String imageUrl) {
        imageDao.upload(imageUrl);
        return new Result<>(200, "上传成功", imageUrl);
    }

    public void deleteFile(String imageUrl) {
        imageDao.deleteFile(imageUrl);
    }

    public Result<List<Image>> getImages() {
        List<Image> result = imageDao.getImages();
        return new Result<List<Image>>(200,"ok",result);
    }
}
