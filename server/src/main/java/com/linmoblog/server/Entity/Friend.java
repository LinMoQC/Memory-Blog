package com.linmoblog.server.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Friend {
    private String friendKey;
    private int status;
    private String siteName;
    private String avatar;
    private String siteUrl;
    private String description;
}
