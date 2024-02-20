package com.linmoblog.server.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TagLevelTwo {
    private int tagKey;
    private String title;
    private int level;
    private String color;
    private String fatherTag;
}
