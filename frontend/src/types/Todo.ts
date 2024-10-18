export interface TodoType {
  _id?: any;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoContextType {
  todos: TodoType[];
  saveTodo: (todo: TodoType) => void;
  updateTodo: (id: number) => void;
  fetchTodos: () => void;
}
