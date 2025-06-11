import React from 'react';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Todo 应用</h1>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
