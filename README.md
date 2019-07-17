# node-deploy-script

前端工程化的一个基础能力就是自动部署前端打包后的代码到服务器.基于node和typecript写了一个自动部署的脚步.

脚本的逻辑是先将目录打包压缩包,再通过SSH上传到服务器,最后解压和备份.

![图片](https://i.loli.net/2019/07/17/5d2ef632b8e1f76645.png)

## 配置

在开始部署之前,你需要在项目的跟目录中`server.json`文件中配置打包信息.

```json
{
  "host": "192.168.1.110", // 服务器地址
  "username": "name", // 账户
  "password": "password", // 密码
  "path": "/data/ff/web", // 服务器端目录
  "port": 22, // 端口号
  "localDir": "dist/" // 本地打包目录
}
```

## 部署

```bash
$npm install // 初始化项目
$npm run deploy // 开始部署
```
