package com.linmoblog.server.Mapper;

import com.linmoblog.server.Entity.Friend;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface FriendsMapper {

    @Select("select * from friends")
    List<Friend> getFriendsList();

    @Insert("insert into friends (site_name, avatar,site_url,description,status) " +
            "values(#{siteName},#{avatar},#{siteUrl},#{description},#{status}) ")
    void addFriends(Friend friend);

    @Update("update friends set status = 1 where friend_key = #{friendKey}")
    void updateFriend(int friendKey);


    void deleteFriend(List<Integer> friendKey);
}
