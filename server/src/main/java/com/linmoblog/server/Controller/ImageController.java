package com.linmoblog.server.Controller;

import cn.hutool.core.io.FileUtil;
import com.linmoblog.server.Entity.Image;
import com.linmoblog.server.Entity.Result;
import com.linmoblog.server.Service.ImageService;
import org.apache.ibatis.jdbc.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.rmi.AccessException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/protect")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @Value("${files.upload.path}")
    private String uploadPath;

//    @Value("${files.domain.siteUrl}")
//    private String domain;

    private static final String domain = "http://localhost:8080";

    @PostMapping("/upload")
    public Result<String> upload(@RequestParam MultipartFile file) {
        try {
            // 获取上传文件的原始文件名
            String fileName = file.getOriginalFilename();
            //重命名文件
            String saveFileName = UUID.randomUUID().toString() + '.' + FileUtil.extName(fileName);
            // 构造文件保存的路径
            String filePath = Paths.get(uploadPath, saveFileName).toString();
            // 获取上传目录的绝对路径
            Path absolutePath = Paths.get(uploadPath).toAbsolutePath();
            // 构造文件的绝对路径
            String absoluteFilePath = Paths.get(String.valueOf(absolutePath), saveFileName).toString();
            // 将上传的文件传输到指定位置
            file.transferTo(new File(absoluteFilePath));

            // 将路径保存数据库
            String imageUrl = domain + "/upload/" + saveFileName;

            // 现在可以将 imageUrl 保存到数据库
            return imageService.upload(imageUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return new Result<String>(500, "上传失败: " + e.getMessage(), null);
        }
    }


    @DeleteMapping("/delImg")
    public Result<Null> deleteFiles(@RequestBody List<String> fileNames) {
        try {
            List<String> failedDeletions = new ArrayList<>();
            for (String fileName : fileNames) {
                String f = extractFileName(fileName);
                // 构造文件的绝对路径
                Path absolutePath = Paths.get(uploadPath).toAbsolutePath();
                String filePath = Paths.get(String.valueOf(absolutePath), f).toString();
                // 创建文件对象
                File file = new File(filePath);

                String imageUrl = domain + "/upload/" + fileName;
                imageService.deleteFile(fileName);
                // 检查文件是否存在，如果存在则删除
                if (file.exists()) {
                    if (!file.delete()) {
                        failedDeletions.add(f);
                    }
                } else {
                    System.out.println(filePath + " 文件不存在");
                    failedDeletions.add(f);
                }
            }

            if (failedDeletions.isEmpty()) {
                return new Result<>(200, "所有文件删除成功", null);
            } else {
                return new Result<>(500, "以下文件删除失败: " + failedDeletions, null);
            }
        } catch (Exception e) {
            return new Result<>(500, "文件删除失败：" + e.getMessage(), null);
        }
    }


    @GetMapping("/images")
    public Result<List<Image>> getImages() throws Exception {
        return imageService.getImages();
    }


    public static String extractFileName(String url) {
        int lastSlashIndex = url.lastIndexOf('/');
        if (lastSlashIndex != -1) {
            return url.substring(lastSlashIndex + 1);
        }
        return url; // 如果没有斜杠，则返回原始URL
    }
}
