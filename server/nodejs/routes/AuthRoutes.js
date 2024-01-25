const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');

const router = express.Router();

// 根据你的项目结构调整路径
const userDataPath = path.join(__dirname, '../data/data.json');
const userData = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));

router.post('/login', (req, res) => {
    const { account, password } = req.body;
    // 在用户数组中查找匹配的用户
    const user = userData.user[0]

    if (user.account!==account||user.password!==password) {
        return res.status(401).json({ error: '账号或密码错误' });
    }else {
        // 生成 JWT 令牌
        const token = jwt.sign({ account: user.account }, 'hello world', { expiresIn: '1h' });

        // 将令牌作为响应发送
        res.json({ token });
    }
});

module.exports = router;
