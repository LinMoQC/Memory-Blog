package com.linmoblog.server.Service;

import com.linmoblog.server.Dao.CategoryDao;
import com.linmoblog.server.Entity.Category;
import com.linmoblog.server.Entity.Result;
import org.apache.ibatis.jdbc.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryDao categoryDao;

    public Result<List<Category>> getCategoryList() {
        List<Category> categories = categoryDao.getCategories();
        return new Result<List<Category>>(200,"ok", categories);
    }

    public Result<Null> addCategory(Category category) {
        categoryDao.addCategory(category);
        return new Result<Null>(200,"ok");
    }

    public Result<Null> deleteCategory(List<Integer> categories) {
        categoryDao.deleteCategory(categories);
        return new Result<Null>(200,"ok");
    }

    public Result<Null> updateCategory(Integer id, Category category) {
        categoryDao.updateCategory(id,category);
        return new Result<Null>(200,"ok");
    }
}
