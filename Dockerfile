# 阶段1：构建
FROM node:20.12.1-slim as build-stage

# 设置工作目录
WORKDIR /memory

# 复制 package.json 和 package-lock.json（如果存在）
COPY package*.json ./

# 升级 npm 到最新版本
RUN npm install -g npm@latest

# 安装项目依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 设置 NODE_OPTIONS 来增加 Node.js 内存限制
ENV NODE_OPTIONS="--max_old_space_size=4096"

# 构建应用
RUN npm run build

# 阶段2：运行
# 使用 Nginx 镜像作为基础来提供前端静态文件服务
FROM nginx:stable-alpine as production-stage

# 设置工作目录
WORKDIR /usr/share/nginx/html

# 从构建阶段拷贝构建出的文件到 Nginx 目录
COPY --from=build-stage /memory/dist .

# 可选：如果有自定义的 nginx 配置文件，取消注释下面一行并复制配置文件
COPY nginx.conf /etc/nginx/templates/default.conf.template

# 将环境变量传递到 Nginx 配置文件中
#RUN sed -i 's|$BACK_API|'"$BACK_API"'|g' /etc/nginx/conf.d/default.conf

# 暴露80端口
EXPOSE 80
