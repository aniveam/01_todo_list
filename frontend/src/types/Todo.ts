export interface Todo {
  _id?: any;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoContextType {
  todos: Todo[];
  saveTodo: (todo: Todo) => void;
  updateTodo: (id: number) => void;
  fetchTodos: () => void;
}