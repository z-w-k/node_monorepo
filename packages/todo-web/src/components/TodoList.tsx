import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../services/api';
import type { Todo } from '../services/api';

// TodoList 组件：管理整个待办事项列表
const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 加载待办事项
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        const data = await fetchTodos();
        setTodos(data);
        setError(null);
      } catch (err) {
        setError('加载待办事项失败');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  // 添加新的待办事项
  const handleAddTodo = async () => {
    if (inputText.trim() !== '') {
      try {
        const newTodo = await addTodo(inputText);
        if (newTodo) {
          setTodos([...todos, newTodo]);
          setInputText('');
        }
      } catch (err) {
        setError('添加待办事项失败');
        console.error(err);
      }
    }
  };

  // 删除待办事项
  const handleDeleteTodo = async (id: string) => {
    try {
      const success = await deleteTodo(id);
      if (success) {
        setTodos(todos.filter(todo => todo.id !== id));
      }
    } catch (err) {
      setError('删除待办事项失败');
      console.error(err);
    }
  };

  // 切换待办事项的完成状态
  const handleToggleComplete = async (id: string) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (todoToUpdate) {
        const updatedTodo = await updateTodo(id, { completed: !todoToUpdate.completed });
        if (updatedTodo) {
          setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
        }
      }
    } catch (err) {
      setError('更新待办事项失败');
      console.error(err);
    }
  };

  // 处理输入框按下回车键
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">待办事项清单</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex">
        <input
          type="text"
          className="todo-input"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="请输入待办事项..."
        />
        <button className="todo-button ml-2" onClick={handleAddTodo}>
          添加
        </button>
      </div>

      <div className="todo-list">
        {loading ? (
          <p className="text-center text-gray-500">加载中...</p>
        ) : todos.length === 0 ? (
          <p className="text-center text-gray-500">暂无待办事项</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDeleteTodo}
              onToggleComplete={handleToggleComplete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
