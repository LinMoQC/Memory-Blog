package com.linmoblog.server.Controller;

import com.linmoblog.server.Entity.Friend;
import com.linmoblog.server.Entity.Result;
import com.linmoblog.server.Service.FriendsService;
import org.apache.ibatis.jdbc.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class FriendsController {
    @Autowired
    private FriendsService friendsService;

    @GetMapping("/public/friends")
    public Result<List<Friend>> getFriends() {
        return friendsService.getFriendsList();
    }

    @PostMapping("/protected/friends")
    public Result<Null> addFriends(@RequestBody Friend friend) {
        return friendsService.addFriends(friend);
    }

    @PostMapping("/protected/friends/{friendKey}")
    public Result<Null> updateFriend(@PathVariable int friendKey) {
        return friendsService.updateFriend(friendKey);
    }

    @DeleteMapping("/protected/friends")
    public Result<Null> delFriend(@RequestBody List<Integer> friendKey) {
        return friendsService.deleteFriend(friendKey);
    }
}
