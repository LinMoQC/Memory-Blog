# ☀️ LinMo Blog

  一个正在开发的React+TypeScript+SpringBoot博客
  
  - 后台UI ✔
  - 接口开发
  - 前台UI

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
- Express框架的nodejs接口（部署在了vercel上但是需要翻墙，也可以本地运行）

## 项目结构
```bash
Blog/
|-- server/
|   |-- db.json    //json-server启动文件
|-- src/
|   |-- apis         //封装接口api
|   |-- assets       //静态资源
|   |-- components   //可复用组件
|   |-- interface    //类型约束
|   |-- pages        //页面组件
|   |-- router       //路由
|   |-- store        //Redux状态管理库
|-- package.json
|-- README.md
```

## 😉 预览

### Login页面
![](./预览图/login.png)

### 后台首页
![c38005904c9c5be6da96853c0167e40](https://github.com/LinMoQC/LinMoBlog/assets/59323207/ce6a46cb-20c4-4b32-847b-3540b3d3ca5b)

### 暗黑模式
![e6741ccfe03917957ac5eaabb45eade](https://github.com/LinMoQC/LinMoBlog/assets/59323207/383f7e2e-0829-45f6-95b8-16dacd96b604)


### 笔记
![7331c98347d96d2236d449935723c47](https://github.com/LinMoQC/LinMoBlog/assets/59323207/bfa56f74-ba0e-46e9-a109-2174415336bf)
![825e53fc859297c29cd0891f50f0164](https://github.com/LinMoQC/LinMoBlog/assets/59323207/578863ed-dcf9-4863-b1d1-25d4f38ea3cb)
![aacfcd119c34f4f26cb4d4b5e24c27e](https://github.com/LinMoQC/LinMoBlog/assets/59323207/64962988-310c-409b-99be-63a6d62b34f8)
![2563eab5a1964e16a0e59f958a7f652](https://github.com/LinMoQC/LinMoBlog/assets/59323207/5ae3a88b-e0fa-435f-af1b-580b2d4141e6)


### 说说
![0e87026ca10e8eea0bccc3eb7bc91e3](https://github.com/LinMoQC/LinMoBlog/assets/59323207/5d9af682-9230-4d66-bb07-00a5963dc96e)


### 图库
![a258afefc28d0cee24e21b864b7cabb](https://github.com/LinMoQC/LinMoBlog/assets/59323207/ba0f15f7-cb83-4bb9-a25e-09d46960a8c6)

### 友链
![ad6eb864bc573c8b9996ddf3ddfe978](https://github.com/LinMoQC/LinMoBlog/assets/59323207/d525fcdd-0bd5-4a3b-9ff9-433e24f414ec)

### 站点分析
![3f5340f422f1a501cf675c70b401980](https://github.com/LinMoQC/LinMoBlog/assets/59323207/78e6268c-dad3-4404-8c85-b7ff80f1a5db)

### 站点管理
![28cca66c9a8b2f08e2ef0eb30e7c147](https://github.com/LinMoQC/LinMoBlog/assets/59323207/7f82153d-0688-4581-9347-f604098df0f8)


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
