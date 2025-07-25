!!! note

vercel 限制免费用户的项目的 sse 连接时长，国内访问速度慢。但是服务器内存小，build next项目会卡死，于是想出了使用github action来构建，然后 ssh 推到服务器上去安装和运行

- 给 `deploy.yml` 增加了备份的功能
!!!

### 环境变量使用

#### 找到 `Setting/Environments` 并且创建自己的环境

![/public/images/2025-6-25-0001.png](/public/images/2025-6-25-0001.png)

#### 设置对应的环境变量

- Environment secrets 是 `secrets.*` 的变量
- Environment variables 是 `vars.*` 的变量

![/public/images/2025-6-25-0002.png](/public/images/2025-6-25-0002.png)

### 创建git action检测的部署文件

项目根目录创建`.github/workflows/deploy.yml`文件

```yml
name: Next.js CI/CD to Self-Hosted Server

on:
  push:
    branches:
      - main # 当推送到 main 分支时触发

jobs:
  deploy:
    runs-on: ubuntu-latest # 使用最新的 Ubuntu Runner
    environment: production

    steps:
      - name: Checkout code
        uses: actions/checkout@v4 # 检出代码

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20' # 指定Node.js版本，与服务器保持一致或更高

      - name: Install dependencies
        run: npm install -g pnpm; pnpm i # 使用 npm ci 确保安装精确的依赖版本

      - name: Build Next.js application
        run: pnpm build # 构建 Next.js 应用

      - name: Create .env.production file (if needed)
        # 如果你的Next.js应用在生产环境需要特定的环境变量，可以在这里创建
        # 注意：敏感信息不应直接写在这里，应通过GitHub Secrets传递
        run: |
          echo "NODE_ENV=production" > .env.production
          echo "NEXT_PUBLIC_URL=${{ vars.NEXT_PUBLIC_URL }}" >> .env.production
          echo "NEXT_GEMINI_KEY=${{ vars.NEXT_GEMINI_KEY }}" >> .env.production
          echo "NEXT_GEMINI_MODEL=${{ vars.NEXT_GEMINI_MODEL }}" >> .env.production
          echo "NEXT_MCP_SERVER_URL=${{ vars.NEXT_MCP_SERVER_URL }}" >> .env.production
          echo "NEXT_GEMINI_URL=${{ vars.NEXT_GEMINI_URL }}" >> .env.production
          # ... 其他生产环境变量

      - name: Run Backup commands on server via SSH
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          port: 22
          script: |
            source ~/.zshrc
            
            cd ${{ secrets.DEPLOY_PATH }}

            echo "Stopping existing PM2 process..."
            # 停止并删除旧的PM2进程，如果不存在则忽略错误
            pm2 stop ${{ secrets.NEXT_PUBLIC_APP_NAME }} || true
            pm2 delete ${{ secrets.NEXT_PUBLIC_APP_NAME }} || true

            echo "Start backup process..."
            rm -rf backup
            mkdir backup
            mv cur/* backup/

            echo "Backup complete!"

      - name: Deploy to server via SCP
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          port: 22 # 默认SSH端口，如果不同请修改
          source: ".next/,content/,public/,package.json,package-lock.json,next.config.js,.env.production" # 需要传输的文件和目录
          target: ${{ secrets.DEPLOY_PATH }}/cur # 服务器上的目标路径
          # 如果你的项目根目录还有其他需要的文件，例如 `components/` 或 `lib/`，
          # 并且这些文件在 `.next/` 之外，你需要将它们也包含在 source 中。
          # 通常，Next.js 的构建产物都在 .next/ 和 public/ 中。
          # package.json 和 package-lock.json 用于在服务器上安装生产依赖。

      - name: Run deployment commands on server via SSH
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          port: 22
          script: |
            source ~/.zshrc
            
            cd ${{ secrets.DEPLOY_PATH }}/cur

            echo "Installing production dependencies..."
            pnpm install --production # 只安装生产依赖，节省空间和时间

            echo "Stopping existing PM2 process..."
            # 停止并删除旧的PM2进程，如果不存在则忽略错误
            pm2 stop ${{ secrets.NEXT_PUBLIC_APP_NAME }} || true
            pm2 delete ${{ secrets.NEXT_PUBLIC_APP_NAME }} || true

            echo "Starting new PM2 process..."
            # 启动Next.js应用，使用 npm run start 命令
            # 确保你的 package.json 中有 "start": "next start"
            pm2 start pnpm --name ${{ secrets.NEXT_PUBLIC_APP_NAME }} -- start

            echo "Saving PM2 configuration..."
            pm2 save

            echo "Deployment complete!"
```

### 把代码推到 github 上自动部署

#### 查看部署过的记录

![/public/images/2025-6-25-0003.png](/public/images/2025-6-25-0003.png)

#### 点击查看运行日志

![/public/images/2025-6-25-0004.png](/public/images/2025-6-25-0004.png)

