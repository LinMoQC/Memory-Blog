package com.linmoblog.server.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WebInfo {
    private String blogTitle;
    private String blogAuthor;
    private String blogDomain;
    private String blogDescription;
    private String blogIcp;
    private String userAccount;
    private String userPassword;
    private String userAvatar;
    private String userTalk;
    private String socialGithub;
    private String socialCsdn;
    private String socialBilibili;
    private String socialQQ;
    private String socialNeteaseCloud;
    private String openAiToken;
    private String neteaseCookies;
    private String githubToken;
}
