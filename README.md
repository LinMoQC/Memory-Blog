# ☀️ LinMo Blog

  一个正在开发的React+TypeScript+SpringBoot博客

## ✨ 功能特性

- Login+后台页面UI
- 登录逻辑+token持久化
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

## 项目结构
```bash
Blog/
|-- server/
|   |-- db.json    //json-server启动文件
|-- src/
|   |-- apis         //封装接口api
|   |-- assets       //静态资源
|   |-- conponents   //可复用组件
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
![](./预览图/adimin1.png)
![](./预览图/admin2.png)

### 暗黑模式
![](./预览图/admin3.png)
![](./预览图/admin4.png)

## 👉 食用方法

1. 克隆项目到本地：

   ```bash
   git clone https://github.com/your-username/react-blog.git

   //启动前端
   cd LinMo
   npm run dev

   //启动后端
   cd server
   json-server --watch db.json --port 3000   
