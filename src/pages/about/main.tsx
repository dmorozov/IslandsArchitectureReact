import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import TodoList from '../../islands/TodoList.island';

// Hydrate Todo List Island
const todoListElement = document.getElementById('todo-list-island');
if (todoListElement) {
  createRoot(todoListElement).render(
    <StrictMode>
      <TodoList />
    </StrictMode>
  );
}
