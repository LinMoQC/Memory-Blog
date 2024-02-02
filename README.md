# ☀️ LinMo Blog

  一个正在开发的React+TypeScript+SpringBoot博客

## ✨ 功能特性

- Login+后台页面UI
- 登录逻辑+token持久化与过期处理
- Axios封装

## 👌 技术栈

### 前端
- React + TypeScript
- React Router
- React Reducer
- Sass预编译器
- Axios
- Vite

### 后端
- json-servre模拟接口（暂时）
- Express框架的nodejs接口（部署在了vercel上，可以本地运行）

## 项目结构
```bash
Blog/
|-- server/
|   |-- db.json    //json-server启动文件
|-- src/
|   |-- apis         //封装接口api
|   |-- assets       //静态资源
|   |-- components   //可复用组件
|   |-- pages        //页面组件
|   |-- router       //路由
|   |-- store        //Redux状态管理库
|-- package.json
|-- README.md
```

## 😉 预览

### Login页面
![](./预览图/login.png)

### 后台
![](./预览图/6dfd3bba599fe52e6036d11048d2d5a.png)

### 暗黑模式
![](./预览图/4c231a8c0883ca239473ed4212cbdcb.png)

### 笔记
![](./预览图/4f0b79b38e638ab3575b58d9e7f3bbf.png)
![](./预览图/7be2fa75cafc471cd67bf43a88eeec6.png)
![](./预览图/ca47cdbe89724673ce6d729b9c96d15.png)
![](./预览图/8aa529549653d4ba2651ba6d0e3bb1c.png)

### 说说
![image](https://github.com/LinMoQC/LinMoBlog/assets/59323207/2ef3a816-6aa3-43dd-860d-6e014a4de4c7)


## 👉 食用方法

1. 克隆项目到本地：

   ```bash
   git clone https://github.com/your-username/react-blog.git

   //启动前端
   cd LinMo
   npm install
   npm run dev

   //启动后端--json-server
   cd server
   json-server --watch db.json --port 3000

   //启动后端--Express框架的nodejs接口(二选一）
   cd server/nodejs
   nodemon app.js   
