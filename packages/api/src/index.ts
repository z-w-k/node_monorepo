import express from 'express';
import { formatDate, capitalize, generateId } from '@monorepo/common';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// 示例数据
const users = [
  { id: '1', name: 'john doe', createdAt: new Date('2023-01-15') },
  { id: '2', name: 'jane smith', createdAt: new Date('2023-02-20') }
];

// 路由
app.get('/', (req, res) => {
  res.json({ message: 'API 正在运行' });
});

app.get('/users', (req, res) => {
  // 使用 common 包中的函数格式化响应
  const formattedUsers = users.map(user => ({
    id: user.id,
    name: capitalize(user.name), // 使用 common 包中的 capitalize 函数
    createdAt: formatDate(user.createdAt) // 使用 common 包中的 formatDate 函数
  }));
  
  res.json(formattedUsers);
});

app.post('/users', (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: '名称是必需的' });
  }
  
  // 使用 common 包中的 generateId 函数
  const newUser = {
    id: generateId(),
    name,
    createdAt: new Date()
  };
  
  users.push(newUser);
  
  res.status(201).json({
    id: newUser.id,
    name: capitalize(newUser.name),
    createdAt: formatDate(newUser.createdAt)
  });
});

app.listen(port, () => {
  console.log(`API 服务器运行在端口 ${port}`);
}); 