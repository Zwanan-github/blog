# node 22
FROM node:22

# 设置工作目录
WORKDIR /app

# 安装依赖
COPY package.json . 
RUN npm install

# 复制项目文件
COPY . .

# Build
RUN npm run build

# 启动项目
CMD ["npm", "run", "start"]
