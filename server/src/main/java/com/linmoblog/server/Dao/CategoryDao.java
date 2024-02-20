package com.linmoblog.server.Dao;

import com.linmoblog.server.Entity.Category;
import com.linmoblog.server.Mapper.CategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CategoryDao {
    @Autowired
    private CategoryMapper categoryMapper;

    public List<Category> getCategories() {
        return categoryMapper.getCategories();
    }

    public void addCategory(Category category) {
        categoryMapper.addCategory(category);
    }

    public void deleteCategory(List<Integer> categories) {
        categoryMapper.deleteCategory(categories);
    }

    public void updateCategory(Integer id, Category category) {
        categoryMapper.updateCategory(id,category);
    }
}
