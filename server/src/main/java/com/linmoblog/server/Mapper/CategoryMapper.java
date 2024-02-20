package com.linmoblog.server.Mapper;

import com.linmoblog.server.Entity.Category;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CategoryMapper {

    @Select("select * from categories")
    List<Category> getCategories();

    @Insert("insert into categories (category_title, introduce,icon,color) values(#{categoryTitle},#{introduce},#{icon},#{color})")
    void addCategory(Category category);

    void deleteCategory(List<Integer> categories);

    void updateCategory(Integer id, Category category);
}
