import { useState } from "react";
import { TodoItem } from "@/types/todo";
import { addTodo, deleteTodo } from "@/utils/priorityUtils";
import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";
import MissingPriorities from "@/components/MissingPriorities";
import { CheckCircle2 } from "lucide-react";

const Index = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const handleAddTodo = (title: string, priority: number) => {
    setTodos((prev) => addTodo(prev, title, priority));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => deleteTodo(prev, id));
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-2 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3">
            <CheckCircle2 className="w-10 h-10 text-primary glow-primary" />
            <h1 className="text-4xl sm:text-5xl font-bold text-gradient-primary">
              DoneThat
            </h1>
          </div>
          <p className="text-muted-foreground text-lg italic">
            "Been there. DoneThat."
          </p>
        </header>

        {/* Add Task Section */}
        <section 
          className="neumorphic-card animate-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Add New Task
          </h2>
          <AddTodo onAdd={handleAddTodo} />
        </section>

        {/* Todo List */}
        <section 
          className="neumorphic-card animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              Tasks
            </h2>
            {todos.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {todos.length} task{todos.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <TodoList todos={todos} onDelete={handleDeleteTodo} />
        </section>

        {/* Missing Priorities */}
        <section 
          className="animate-fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <MissingPriorities todos={todos} />
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <p>Lower priority number = Higher importance</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
