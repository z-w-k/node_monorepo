# Todo HTTP 服务

一个基于 Node.js 和 TypeScript 构建的简单 HTTP Todo 列表服务。

## 功能特点

- 创建、读取、更新和删除待办事项
- RESTful API 接口
- 内存数据存储
- 使用 monorepo 中的通用工具函数

## API 接口

- `GET /todos` - 获取所有待办事项
- `POST /todos` - 创建新的待办事项
- `GET /todos/:id` - 获取特定待办事项
- `PUT /todos/:id` - 更新待办事项
- `DELETE /todos/:id` - 删除待办事项
- `POST /echo` - 回显请求体（用于测试）

## 使用方法

```bash
# 开发环境
npm run dev:todo-http

# 构建
npm run build:todo-http

# 生产环境
npm run start:todo-http
```

## 依赖

- `@monorepo/common` - monorepo 中的共享工具函数
