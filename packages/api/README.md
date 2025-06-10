# API 服务

一个简单的 RESTful API 服务，使用 Express 和 TypeScript 构建。

## 功能

- 用户管理 API
- 使用 monorepo 中的通用工具函数

## API 接口

- `GET /` - 检查 API 状态
- `GET /users` - 获取所有用户
- `POST /users` - 创建新用户

## 使用方法

```bash
# 开发环境
npm run dev:api

# 构建
npm run build:api

# 生产环境
npm run start:api
```

## 依赖

- `express` - Web 框架
- `@monorepo/common` - monorepo 中的共享工具函数 