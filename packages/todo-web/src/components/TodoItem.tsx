import React from 'react';
import type { Todo } from '../services/api';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

// TodoItem 组件：显示单个待办事项
const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onToggleComplete }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'todo-item-completed' : ''}`}>
      <span>{todo.title}</span>
      <div className="todo-actions">
        <button
          className="todo-action-button todo-complete"
          onClick={() => onToggleComplete(todo.id)}
        >
          {todo.completed ? '撤销' : '完成'}
        </button>
        <button className="todo-action-button todo-delete" onClick={() => onDelete(todo.id)}>
          删除
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
