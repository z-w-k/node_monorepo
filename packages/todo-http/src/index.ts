import { createServer, IncomingMessage, ServerResponse } from 'http';
import { generateId, formatDate } from '@monorepo/common';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

interface RequestData {
  headers: object;
  method: string | undefined;
  url: string | undefined;
  body?: unknown;
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

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  const { headers, method, url } = request;
  const chunks: Buffer[] = [];

  request
    .on('error', (err: Error) => {
      console.error(err);
      response.statusCode = 500;
      response.end('服务器内部错误');
    })
    .on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    })
    .on('end', () => {
      const body = Buffer.concat(chunks).toString();

      console.log(`${method} ${url}`);

      // 设置响应头
      response.setHeader('Content-Type', 'application/json');
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      // 处理 CORS 预检请求
      if (method === 'OPTIONS') {
        response.statusCode = 204;
        response.end();
        return;
      }

      // 处理不同的路由
      if (url === '/todos') {
        if (method === 'GET') {
          // 使用 common 包中的函数格式化待办事项
          const formattedTodos = todos.map(todo => ({
            ...todo,
            createdAt: formatDate(todo.createdAt),
          }));
          response.end(JSON.stringify(formattedTodos));
        } else if (method === 'POST') {
          try {
            const todoData = JSON.parse(body);
            if (!todoData.title) {
              response.statusCode = 400;
              response.end(JSON.stringify({ error: '标题是必需的' }));
              return;
            }

            // 使用 common 包中的 generateId 函数
            const newTodo: Todo = {
              id: generateId(),
              title: todoData.title,
              completed: false,
              createdAt: new Date(),
            };

            todos.push(newTodo);

            response.statusCode = 201;
            response.end(
              JSON.stringify({
                ...newTodo,
                createdAt: formatDate(newTodo.createdAt),
              }),
            );
          } catch (_error) {
            response.statusCode = 400;
            response.end(JSON.stringify({ error: '无效的 JSON' }));
          }
        } else {
          response.statusCode = 405;
          response.end(JSON.stringify({ error: '方法不允许' }));
        }
      } else if (url?.startsWith('/todos/')) {
        const id = url.split('/')[2];
        const todoIndex = todos.findIndex(todo => todo.id === id);

        if (todoIndex === -1) {
          response.statusCode = 404;
          response.end(JSON.stringify({ error: '找不到待办事项' }));
          return;
        }

        if (method === 'GET') {
          response.end(
            JSON.stringify({
              ...todos[todoIndex],
              createdAt: formatDate(todos[todoIndex].createdAt),
            }),
          );
        } else if (method === 'PUT') {
          try {
            const todoData = JSON.parse(body);
            todos[todoIndex] = {
              ...todos[todoIndex],
              ...todoData,
              id, // 确保 ID 不变
            };

            response.end(
              JSON.stringify({
                ...todos[todoIndex],
                createdAt: formatDate(todos[todoIndex].createdAt),
              }),
            );
          } catch (_error) {
            response.statusCode = 400;
            response.end(JSON.stringify({ error: '无效的 JSON' }));
          }
        } else if (method === 'DELETE') {
          const deletedTodo = todos.splice(todoIndex, 1)[0];
          response.end(
            JSON.stringify({
              ...deletedTodo,
              createdAt: formatDate(deletedTodo.createdAt),
            }),
          );
        } else {
          response.statusCode = 405;
          response.end(JSON.stringify({ error: '方法不允许' }));
        }
      } else if (method === 'POST' && url === '/echo') {
        // 原始的 echo 功能
        response.end(body);
      } else {
        response.statusCode = 404;
        const content: RequestData = { headers, method, url };
        if (body) content.body = body;
        response.end(JSON.stringify(content));
      }
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Todo HTTP 服务器运行在端口 ${PORT}`);
});
