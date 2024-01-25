const express = require('express');
const getInfo = require('./middlewares/getInfo.js');
const AuthRoutes = require('./routes/AuthRoutes.js');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// 使用body-parser中间件解析JSON请求体
app.use(bodyParser.json());

// 使用cors中间件启用CORS
app.use(cors());

// 注册AuthRoutes路由
app.use('/api', AuthRoutes);

app.get('/', (req, res) => {
    res.send('hello');
});

const PORT = 28;
app.listen(PORT, () => {
    console.log(`接口服务启动：http://localhost:${PORT}`);
});
