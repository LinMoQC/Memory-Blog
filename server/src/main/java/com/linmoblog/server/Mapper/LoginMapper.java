package com.linmoblog.server.Mapper;

import com.linmoblog.server.Entity.User;
import com.linmoblog.server.Entity.UserInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface LoginMapper {

    @Select("select * from user where username = #{username} and password = #{password}")
    User login(User user);

    @Select(("select avatar,talk,name from user"))
    UserInfo userinfo();
}
