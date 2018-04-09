
## 准备工作
- node.js环境（npm包管理器）
- vue-cli 脚手架构建工具
- cnpm  npm的淘宝镜像

## 开发运行
```bash
   
    # 安装依赖
    npm install
    //or # 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
    npm install --registry=https://registry.npm.taobao.org

    # 本地开发 开启服务
    npm run dev
```
浏览器访问 http://localhost:9527/index

## 发布

    开发环境 npm run dev
```bash
    
    # 发布测试环境 带webpack ananalyzer
    npm run build:sit-preview

    # 构建生成环境
    npm run build:prod
```
### 部署nginx配置参考
```
  location / {
        # 指向我们打包后上传的前端文件
        root /opt/nginx/dist;
        index index.html;
    }
    location /jwt/ {
        # 转发请求到后端服务网关
        proxy_pass http://127.0.0.1:8765/jwt/;
    }
    location /api/ {
        proxy_pass http://127.0.0.1:8765/api/;
     }
```
 