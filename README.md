# Monorepo

这是一个使用单一 git 仓库管理的 monorepo。它在 `packages/` 目录中包含多个包。

## 结构

```
.
├── packages/         # 所有包都存储在这里
│   ├── common/       # 跨包共享的通用工具
│   ├── api/          # API 服务
│   ├── todo-http/    # HTTP Todo 列表服务
│   └── ...           # 更多包
├── package.json      # 根目录的 package.json，带有工作区配置
└── README.md         # 本文件
```

## 入门指南

1. 克隆仓库：
   ```bash
   git clone https://github.com/yourusername/your-monorepo.git
   cd your-monorepo
   ```

2. 为所有包安装依赖：
   ```bash
   pnpm install
   ```

3. 从根目录运行脚本：
   ```bash
   pnpm <脚本名称>
   ```

## 添加新包

要向 monorepo 添加新包：

1. 在 `packages/` 文件夹中创建一个新目录：
   ```bash
   mkdir -p packages/新包名
   ```

2. 初始化包：
   ```bash
   cd packages/新包名
   pnpm init
   ```

3. 确保在其 package.json 文件中为包设置唯一名称。

## 使用包

你可以使用工作区语法处理单个包：

```bash
# 在特定包中安装依赖
pnpm --filter @yourscope/包名 add lodash

# 在特定包中运行脚本
pnpm --filter @yourscope/包名 build
``` 