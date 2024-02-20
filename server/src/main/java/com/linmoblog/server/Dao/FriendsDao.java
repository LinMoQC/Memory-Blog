package com.linmoblog.server.Dao;

import com.linmoblog.server.Entity.Friend;
import com.linmoblog.server.Mapper.FriendsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FriendsDao {

    @Autowired
    private FriendsMapper friendsMapper;

    public List<Friend> getFriendsList() {
        return friendsMapper.getFriendsList();
    }

    public void addFriends(Friend friend) {
        friendsMapper.addFriends(friend);
    }

    public void updateFriend(int friendKey) {
        friendsMapper.updateFriend(friendKey);
    }

    public void deleteFriend(List<Integer> friendKey) {
        friendsMapper.deleteFriend(friendKey);
    }
}
