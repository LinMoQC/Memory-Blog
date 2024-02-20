package com.linmoblog.server.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.linmoblog.server.Entity.Result;
import com.linmoblog.server.Entity.TagLevelOne;
import com.linmoblog.server.Entity.TagLevelTwo;
import com.linmoblog.server.Service.TagService;
import org.apache.ibatis.jdbc.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(value = "/api/protected")
@RestController
public class TagController {
    @Autowired
    private TagService tagService;

    @GetMapping("/tagone")
    public Result<List<TagLevelOne>> getTagsOne(){
        return tagService.getTagsOne();
    }

    @GetMapping("/tagtwo")
    public Result<List<TagLevelTwo>> getTagsTwo(){
        return tagService.getTagsTwo();
    }

    @PostMapping("/tagone")
    public Result<Null> addTagOne(@RequestBody TagLevelOne tagLevelOne){
        return tagService.addTagOne(tagLevelOne);
    }

    @PostMapping("/tagtwo")
    public Result<Null> addTagOne(@RequestBody TagLevelTwo tagLevelTwo){
        return tagService.addTagsTwo(tagLevelTwo);
    }

    @DeleteMapping("/tag")
    public Result<Null> deleteTag(@RequestBody List<Integer> tags){
        return tagService.deleteTags(tags);
    }
}
