import express from 'express';
import cors from 'cors';
import { generateId, formatDate } from '@monorepo/common';

const app = express();
const PORT = process.env.PORT || 8080;

// 中间件
app.use(cors());
app.use(express.json());

// Todo 类型定义
interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

// 内存中的待办事项存储
const todos: Todo[] = [
  {
    id: '1',
    title: '学习 TypeScript',
    completed: true,
    createdAt: new Date('2023-01-15'),
  },
  {
    id: '2',
    title: '构建 monorepo',
    completed: false,
    createdAt: new Date(),
  },
];

// 获取所有待办事项
app.get('/todos', (_req, res) => {
  // 使用 common 包中的函数格式化待办事项
  const formattedTodos = todos.map(todo => ({
    ...todo,
    createdAt: formatDate(todo.createdAt),
  }));
  res.json(formattedTodos);
});

// 创建新的待办事项
app.post('/todos', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: '标题是必需的' });
  }

  // 使用 common 包中的 generateId 函数
  const newTodo: Todo = {
    id: generateId(),
    title,
    completed: false,
    createdAt: new Date(),
  };

  todos.push(newTodo);

  res.status(201).json({
    ...newTodo,
    createdAt: formatDate(newTodo.createdAt),
  });
});

// 获取单个待办事项
app.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    return res.status(404).json({ error: '找不到待办事项' });
  }

  res.json({
    ...todo,
    createdAt: formatDate(todo.createdAt),
  });
});

// 更新待办事项
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: '找不到待办事项' });
  }

  const updatedTodo = {
    ...todos[todoIndex],
    ...req.body,
    id, // 确保 ID 不变
  };

  todos[todoIndex] = updatedTodo;

  res.json({
    ...updatedTodo,
    createdAt: formatDate(updatedTodo.createdAt),
  });
});

// 删除待办事项
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: '找不到待办事项' });
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];

  res.json({
    ...deletedTodo,
    createdAt: formatDate(deletedTodo.createdAt),
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Todo HTTP 服务器运行在端口 ${PORT}`);
});
