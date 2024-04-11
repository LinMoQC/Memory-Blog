# 选择一个带有Node.js的轻量级基础镜像，使用 as 多阶段构建
FROM node:20.12.1-slim as build-stage

# 设置工作目录
WORKDIR /memory

# 复制package.json和package-lock.json（如果存在）
COPY package*.json ./

# 安装项目生产依赖
# 利用 Docker 缓存层，如果 package.json 没有变化，则不会重新安装node modules
RUN npm install --only=production

# 复制项目文件到工作目录
COPY . .

# 构建应用
RUN npm run build

# 阶段2：运行
# 使用 Nginx 镜像作为基础来提供前端静态文件服务
FROM nginx:stable-alpine as production-stage

# 定义环境变量，例如NODE_ENV
# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# 从构建阶段拷贝构建出的文件到Nginx目录
COPY --from=build-stage /app/build /usr/share/nginx/html

# 配置nginx，如果有自定义的nginx配置可以取消注释并修改下面的行
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露80端口
EXPOSE 80

# 启动Nginx服务器
CMD ["nginx", "-g", "daemon off;"]
