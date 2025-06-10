# 通用工具包

这个包包含在 monorepo 中各个项目共享的通用工具函数。

## 功能

- `formatDate`: 将日期格式化为字符串（YYYY-MM-DD）
- `capitalize`: 将字符串的首字母大写
- `generateId`: 生成随机 ID

## 使用方法

```typescript
import { formatDate, capitalize, generateId } from '@monorepo/common';

// 格式化日期
const date = new Date();
const formattedDate = formatDate(date); // 例如：'2023-06-10'

// 首字母大写
const name = capitalize('john'); // 'John'

// 生成随机 ID
const id = generateId(); // 默认长度为 8
const longId = generateId(12); // 指定长度为 12
```

## 安装

由于这是 monorepo 的一部分，你可以在其他包中通过以下方式添加依赖：

```json
{
  "dependencies": {
    "@monorepo/common": "^1.0.0"
  }
}
```
