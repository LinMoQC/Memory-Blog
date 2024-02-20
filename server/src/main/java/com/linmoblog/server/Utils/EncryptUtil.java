package com.linmoblog.server.Utils;

import com.linmoblog.server.Entity.User;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class EncryptUtil {
    public static void encrypt(User user) {
        try {
            // 创建一个 SHA-256 的 MessageDigest 实例
            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            // 对用户的账号进行 SHA-256 加密
            String encryptedUsername = encryptString(user.getUsername(), digest);
            // 对用户的密码进行 SHA-256 加密
            String encryptedPassword = encryptString(user.getPassword(), digest);

            // 更新用户对象的加密后的账号和密码
            user.setUsername(encryptedUsername);
            user.setPassword(encryptedPassword);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }

    private static String encryptString(String input, MessageDigest digest) {
        // 使用指定的字节数组更新哈希计算
        byte[] hash = digest.digest(input.getBytes());

        // 将字节数组转换为十六进制字符串表示
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }

        return hexString.toString();
    }
}