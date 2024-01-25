const fs = require('fs');
const express = require('express');

const jsonMiddleware = (filePath) => {
    const middleware = async (req, res, next) => {
        try {
            // 使用fs.promises.readFile异步地读取文件内容
            const data = await fs.promises.readFile(filePath, 'utf8');

            // 解析JSON数据
            const jsonData = JSON.parse(data);

            // 将解析后的JSON数据附加到请求对象上
            req.jsonData = jsonData;

            // 继续处理下一个中间件或路由处理程序
            next();
        } catch (error) {
            console.error('处理中间件时发生错误:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    return middleware;
};

module.exports = jsonMiddleware;
