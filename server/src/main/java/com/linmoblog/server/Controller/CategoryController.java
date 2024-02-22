package com.linmoblog.server.Controller;

import com.linmoblog.server.Entity.Category;
import com.linmoblog.server.Entity.Result;
import com.linmoblog.server.Service.CategoryService;
import org.apache.ibatis.jdbc.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(value = "/api")
@RestController
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/public/category")
    private Result<List<Category>> getCategoryList(){
        return categoryService.getCategoryList();
    }

    @PostMapping("/protected/category")
    public Result<Null> addCategory(@RequestBody Category category){
        return categoryService.addCategory(category);
    }

    @DeleteMapping("/protected/category")
    public Result<Null> deleteCategory(@RequestBody List<Integer> categories){
        return categoryService.deleteCategory(categories);
    }

    @PostMapping("/protected/category/{id}")
    public Result<Null> updateCategory(@PathVariable Integer id,@RequestBody Category category){
        return categoryService.updateCategory(id,category);
    }
}
