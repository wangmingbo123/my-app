# 使用 Node.js 官方镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

RUN npm install next

# 复制项目文件
COPY . .

# 构建应用（如果需要）
RUN npm run build

# 暴露应用端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]