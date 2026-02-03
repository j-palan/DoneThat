import { TodoItem } from "@/types/todo";
import { computeMissingPriorities } from "@/utils/priorityUtils";
import { Sparkles } from "lucide-react";

interface MissingPrioritiesProps {
  todos: TodoItem[];
}

const MissingPriorities = ({ todos }: MissingPrioritiesProps) => {
  const missingPriorities = computeMissingPriorities(todos);

  return (
    <div className="neumorphic-card">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          Available Priorities
        </h3>
      </div>
      
      {todos.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          Add tasks to see available priority slots
        </p>
      ) : missingPriorities.length === 0 ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-primary/50 animate-pulse" />
          <p className="text-sm">No available priorities</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {missingPriorities.map((priority, index) => (
            <span
              key={priority}
              className="priority-pill animate-pop"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {priority}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MissingPriorities;
