import { TodoItem as TodoItemType } from "@/types/todo";
import { sortTodosByPriority, findMaxPriority } from "@/utils/priorityUtils";
import TodoItem from "./TodoItem";
import { ClipboardList } from "lucide-react";

interface TodoListProps {
  todos: TodoItemType[];
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, priority: number) => void;
  onComplete: (id: string) => void;
}

const TodoList = ({ todos, onDelete, onEdit, onComplete }: TodoListProps) => {
  const sortedTodos = sortTodosByPriority(todos);
  const maxPriority = findMaxPriority(todos);

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground animate-fade-in-up">
        <ClipboardList className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-lg font-medium">No tasks yet</p>
        <p className="text-sm">Add a task to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedTodos.map((todo, index) => (
        <div
          key={todo.id}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <TodoItem
            todo={todo}
            maxPriority={maxPriority}
            onDelete={onDelete}
            onEdit={onEdit}
            onComplete={onComplete}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
