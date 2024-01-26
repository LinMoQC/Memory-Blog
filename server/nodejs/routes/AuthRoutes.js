const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');

const router = express.Router();

const userDataPath = path.join(__dirname, '../data/data.json');
const userData = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
const secretKey = "hello linmo"

router.post('/login', (req, res) => {
    const { account, password } = req.body;

    // 在用户数组中查找匹配的用户
    const user = userData.user[0]

    if (user.account !== account || user.password !== password) {
        return res.status(401).json({ error: '账号或密码错误' });
    } else {
        // 生成 JWT 令牌
        const token = jwt.sign({ account: user.account }, secretKey, { expiresIn: '30s' });

        // 将令牌作为响应发送
        res.json({ token });
    }
});

router.post('/auth', (req, res) => {
    const { token } = req.body;
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                // 令牌过期
                console.error('Token expired:', err.message);
                res.status(401).send({ error: 'Token expired' });
            } else {
                // 其他令牌验证错误
                console.error('Token verification failed:', err.message);
                res.status(401).send({ error: 'Token verification failed' });
            }
        } else {
            // 令牌验证通过
            console.log('Token is valid:', decoded);
            res.status(200).send({ message: 'Token is valid' });
        }
    });
});




module.exports = router;
