export interface TodoItem {
  id: string;
  title: string;
  priority: number;
  createdAt: Date;
  completed: boolean;
}

/**
 * Generate a unique ID for a todo item
 */
export const generateId = (): string => {
  return crypto.randomUUID();
};

/**
 * Add a new TODO item to the list
 */
export const addTodo = (
  todos: TodoItem[],
  title: string,
  priority: number
): TodoItem[] => {
  const newTodo: TodoItem = {
    id: generateId(),
    title: title.trim(),
    priority,
    createdAt: new Date(),
    completed: false,
  };
  return [...todos, newTodo];
};

/**
 * Delete a TODO item by ID
 */
export const deleteTodo = (todos: TodoItem[], id: string): TodoItem[] => {
  return todos.filter((todo) => todo.id !== id);
};

/**
 * Edit a TODO item by ID - update title and/or priority
 */
export const editTodo = (
  todos: TodoItem[],
  id: string,
  title: string,
  priority: number
): TodoItem[] => {
  return todos.map((todo) =>
    todo.id === id
      ? { ...todo, title: title.trim(), priority }
      : todo
  );
};

/**
 * Complete a TODO item by ID - marks task as completed
 * Completed tasks release their priority (similar to delete for priority tracking)
 */
export const completeTodo = (todos: TodoItem[], id: string): TodoItem[] => {
  return todos.map((todo) =>
    todo.id === id
      ? { ...todo, completed: true }
      : todo
  );
};

/**
 * Sort TODOs by priority (ascending - lower number = higher priority)
 * Completed tasks are sorted to the bottom
 */
export const sortTodosByPriority = (todos: TodoItem[]): TodoItem[] => {
  return [...todos].sort((a, b) => {
    // Completed tasks go to the bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    // If same priority, sort by creation date (older first)
    return a.createdAt.getTime() - b.createdAt.getTime();
  });
};

/**
 * Extract all unique priorities from active (non-completed) todos
 */
export const extractPriorities = (todos: TodoItem[]): number[] => {
  const activeTodos = todos.filter((todo) => !todo.completed);
  return [...new Set(activeTodos.map((todo) => todo.priority))].sort((a, b) => a - b);
};

/**
 * Find the maximum priority in the list (considers all todos for styling purposes)
 */
export const findMaxPriority = (todos: TodoItem[]): number => {
  if (todos.length === 0) return 0;
  return Math.max(...todos.map((todo) => todo.priority));
};

/**
 * Find the maximum priority among active (non-completed) todos
 */
export const findMaxActivePriority = (todos: TodoItem[]): number => {
  const activeTodos = todos.filter((todo) => !todo.completed);
  if (activeTodos.length === 0) return 0;
  return Math.max(...activeTodos.map((todo) => todo.priority));
};

/**
 * Compute missing priorities from 1 to max(priority) among active todos
 * Completed tasks release their priority, making it available again
 * Example: priorities [1, 3, 5, 5, 7, 12] → missing [2, 4, 6, 8, 9, 10, 11]
 */
export const computeMissingPriorities = (todos: TodoItem[]): number[] => {
  const activeTodos = todos.filter((todo) => !todo.completed);
  if (activeTodos.length === 0) return [];

  const maxPriority = findMaxActivePriority(todos);
  const existingPriorities = new Set(activeTodos.map((todo) => todo.priority));
  const missing: number[] = [];

  for (let i = 1; i <= maxPriority; i++) {
    if (!existingPriorities.has(i)) {
      missing.push(i);
    }
  }

  return missing;
};

/**
 * Validate priority - must be a positive integer
 */
export const isValidPriority = (priority: number): boolean => {
  return Number.isInteger(priority) && priority > 0;
};

/**
 * Validate title - must be non-empty after trimming
 */
export const isValidTitle = (title: string): boolean => {
  return title.trim().length > 0;
};

/**
 * Get priority level for styling (high, medium, low)
 * Based on position relative to all priorities
 */
export const getPriorityLevel = (
  priority: number,
  maxPriority: number
): "high" | "medium" | "low" => {
  if (maxPriority <= 3) {
    // For small ranges, use direct mapping
    if (priority === 1) return "high";
    if (priority === 2) return "medium";
    return "low";
  }

  const ratio = priority / maxPriority;
  if (ratio <= 0.33) return "high";
  if (ratio <= 0.66) return "medium";
  return "low";
};
