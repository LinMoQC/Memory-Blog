package com.linmoblog.server.Entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Category {
    private int categoryKey;
    private String categoryTitle;
    private String introduce;
    private String icon;
    private int noteCount;
    private String color;
}
