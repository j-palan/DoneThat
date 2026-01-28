import { Trash2 } from "lucide-react";
import { TodoItem as TodoItemType } from "@/types/todo";
import { getPriorityLevel } from "@/utils/priorityUtils";

interface TodoItemProps {
  todo: TodoItemType;
  maxPriority: number;
  onDelete: (id: string) => void;
}

const TodoItem = ({ todo, maxPriority, onDelete }: TodoItemProps) => {
  const priorityLevel = getPriorityLevel(todo.priority, maxPriority);
  
  const priorityBadgeClass = {
    high: "priority-badge-high",
    medium: "priority-badge-medium",
    low: "priority-badge-low",
  }[priorityLevel];

  return (
    <div className="group flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-all duration-200 animate-pop">
      {/* Priority badge */}
      <div className={priorityBadgeClass}>
        {todo.priority}
      </div>
      
      {/* Task title */}
      <div className="flex-1 min-w-0">
        <p className="text-foreground font-medium truncate">{todo.title}</p>
      </div>
      
      {/* Delete button */}
      <button
        onClick={() => onDelete(todo.id)}
        className="btn-3d-danger p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-label="Delete task"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TodoItem;
