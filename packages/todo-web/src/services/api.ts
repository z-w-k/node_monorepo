// 定义 Todo 类型
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

// API 基础 URL
const API_URL = 'http://localhost:8080';

// 获取所有待办事项
export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch(`${API_URL}/todos`);
    if (!response.ok) {
      throw new Error('获取待办事项失败');
    }
    return await response.json();
  } catch (error) {
    console.error('获取待办事项出错:', error);
    return [];
  }
};

// 添加新的待办事项
export const addTodo = async (title: string): Promise<Todo | null> => {
  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error('添加待办事项失败');
    }
    return await response.json();
  } catch (error) {
    console.error('添加待办事项出错:', error);
    return null;
  }
};

// 更新待办事项
export const updateTodo = async (id: string, updates: Partial<Todo>): Promise<Todo | null> => {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('更新待办事项失败');
    }
    return await response.json();
  } catch (error) {
    console.error('更新待办事项出错:', error);
    return null;
  }
};

// 删除待办事项
export const deleteTodo = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('删除待办事项失败');
    }
    return true;
  } catch (error) {
    console.error('删除待办事项出错:', error);
    return false;
  }
};
