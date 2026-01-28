import { useState, FormEvent } from "react";
import { Plus } from "lucide-react";
import { isValidPriority, isValidTitle } from "@/utils/priorityUtils";

interface AddTodoProps {
  onAdd: (title: string, priority: number) => void;
}

const AddTodo = ({ onAdd }: AddTodoProps) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [titleError, setTitleError] = useState("");
  const [priorityError, setPriorityError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    let hasError = false;
    
    // Validate title
    if (!isValidTitle(title)) {
      setTitleError("Task name cannot be empty");
      hasError = true;
    } else {
      setTitleError("");
    }
    
    // Validate priority
    const priorityNum = parseInt(priority, 10);
    if (!priority || !isValidPriority(priorityNum)) {
      setPriorityError("Priority must be a positive number");
      hasError = true;
    } else {
      setPriorityError("");
    }
    
    if (hasError) return;
    
    onAdd(title.trim(), priorityNum);
    setTitle("");
    setPriority("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Task name input */}
        <div className="flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (titleError) setTitleError("");
            }}
            placeholder="What needs to be done?"
            className={`input-neumorphic w-full ${
              titleError ? "ring-2 ring-destructive/50 animate-shake" : ""
            }`}
          />
          {titleError && (
            <p className="text-destructive text-sm mt-1 animate-fade-in-up">
              {titleError}
            </p>
          )}
        </div>
        
        {/* Priority input */}
        <div className="w-full sm:w-32">
          <input
            type="number"
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              if (priorityError) setPriorityError("");
            }}
            placeholder="Priority"
            min="1"
            className={`input-neumorphic w-full ${
              priorityError ? "ring-2 ring-destructive/50 animate-shake" : ""
            }`}
          />
          {priorityError && (
            <p className="text-destructive text-sm mt-1 animate-fade-in-up">
              {priorityError}
            </p>
          )}
        </div>
        
        {/* Add button */}
        <button
          type="submit"
          className="btn-3d-primary flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          <span>Add Task</span>
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
