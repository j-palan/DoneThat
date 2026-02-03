import { useState } from "react";
import { Trash2, Pencil, Check, X, CheckCircle } from "lucide-react";
import { TodoItem as TodoItemType } from "@/types/todo";
import { getPriorityLevel, isValidPriority, isValidTitle } from "@/utils/priorityUtils";

interface TodoItemProps {
  todo: TodoItemType;
  maxPriority: number;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, priority: number) => void;
  onComplete: (id: string) => void;
}

const TodoItem = ({ todo, maxPriority, onDelete, onEdit, onComplete }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editPriority, setEditPriority] = useState(todo.priority.toString());
  const [titleError, setTitleError] = useState("");
  const [priorityError, setPriorityError] = useState("");

  const priorityLevel = getPriorityLevel(todo.priority, maxPriority);
  
  const priorityBadgeClass = {
    high: "priority-badge-high",
    medium: "priority-badge-medium",
    low: "priority-badge-low",
  }[priorityLevel];

  const glowClass = {
    high: "hover:glow-task-high",
    medium: "hover:glow-task-medium",
    low: "hover:glow-task-low",
  }[priorityLevel];

  const handleStartEdit = () => {
    setEditTitle(todo.title);
    setEditPriority(todo.priority.toString());
    setTitleError("");
    setPriorityError("");
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setEditPriority(todo.priority.toString());
    setTitleError("");
    setPriorityError("");
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    let hasError = false;

    // Validate title
    if (!isValidTitle(editTitle)) {
      setTitleError("Task name cannot be empty");
      hasError = true;
    } else {
      setTitleError("");
    }

    // Validate priority - check raw input is a positive integer (no decimals)
    const priorityNum = Number(editPriority);
    if (!editPriority || !isValidPriority(priorityNum)) {
      setPriorityError("Priority must be a positive number");
      hasError = true;
    } else {
      setPriorityError("");
    }

    if (hasError) return;

    onEdit(todo.id, editTitle.trim(), priorityNum);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  if (isEditing) {
    return (
      <div className="p-4 rounded-xl bg-secondary/70 border-2 border-primary/50 transition-all duration-200 animate-pop">
        <div className="flex items-start gap-3">
          {/* Priority input */}
          <div className="w-20">
            <input
              type="number"
              min="1"
              value={editPriority}
              onChange={(e) => {
                setEditPriority(e.target.value);
                if (priorityError) setPriorityError("");
              }}
              onKeyDown={handleKeyDown}
              className={`w-full h-10 text-center rounded-lg bg-background border border-border text-foreground font-bold focus:outline-none focus:ring-2 focus:ring-primary ${
                priorityError ? "ring-2 ring-destructive/50 animate-shake" : ""
              }`}
              aria-label="Edit priority"
            />
          </div>
          
          {/* Title input */}
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => {
                setEditTitle(e.target.value);
                if (titleError) setTitleError("");
              }}
              onKeyDown={handleKeyDown}
              className={`w-full h-10 px-3 rounded-lg bg-background border border-border text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary ${
                titleError ? "ring-2 ring-destructive/50 animate-shake" : ""
              }`}
              aria-label="Edit task title"
              autoFocus
            />
          </div>
          
          {/* Save button */}
          <button
            onClick={handleSaveEdit}
            className="btn-3d-primary p-2 transition-opacity duration-200"
            aria-label="Save changes"
          >
            <Check className="w-4 h-4" />
          </button>
          
          {/* Cancel button */}
          <button
            onClick={handleCancelEdit}
            className="btn-3d-danger p-2 transition-opacity duration-200"
            aria-label="Cancel editing"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Error messages */}
        {(priorityError || titleError) && (
          <div className="flex gap-3 mt-2">
            <div className="w-20">
              {priorityError && (
                <p className="text-destructive text-xs animate-fade-in-up">
                  {priorityError}
                </p>
              )}
            </div>
            <div className="flex-1">
              {titleError && (
                <p className="text-destructive text-xs animate-fade-in-up">
                  {titleError}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Completed task styling
  if (todo.completed) {
    return (
      <div className="group flex items-center gap-4 p-4 rounded-xl bg-secondary/30 opacity-60 transition-all duration-200 animate-pop">
        {/* Priority badge - muted */}
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold text-sm line-through">
          {todo.priority}
        </div>
        
        {/* Task title - crossed out */}
        <div className="flex-1 min-w-0">
          <p className="text-muted-foreground font-medium truncate line-through decoration-2">{todo.title}</p>
        </div>
        
        {/* Completed indicator */}
        <CheckCircle className="w-5 h-5 text-green-500" />
        
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
  }

  return (
    <div className={`group flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary/70 hover:scale-105 ${glowClass} transition-all duration-200 animate-pop`}>
      {/* Priority badge */}
      <div className={priorityBadgeClass}>
        {todo.priority}
      </div>
      
      {/* Task title */}
      <div className="flex-1 min-w-0">
        <p className="text-foreground font-medium truncate">{todo.title}</p>
      </div>
      
      {/* Complete button */}
      <button
        onClick={() => onComplete(todo.id)}
        className="btn-3d-success p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-label="Complete task"
      >
        <CheckCircle className="w-4 h-4" />
      </button>
      
      {/* Edit button */}
      <button
        onClick={handleStartEdit}
        className="btn-3d-primary p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-label="Edit task"
      >
        <Pencil className="w-4 h-4" />
      </button>
      
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
