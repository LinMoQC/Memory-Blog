import crypto from "crypto";

// 生成随机字符串
function generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
}

// 生成MD5加密的Token
function generateToken() {
    const randomString = generateRandomString(64); // 生成16个字符的随机字符串
    const token = crypto.createHash('md5').update(randomString).digest('hex'); // 使用MD5加密随机字符串
    return token;
}

const randomToken = generateToken();
console.log(randomToken);
