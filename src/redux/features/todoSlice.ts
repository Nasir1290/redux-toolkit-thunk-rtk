import { TTodo } from "@/redux/features/todoSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TTodo = {
  id?: string;
  title: string;
  description: string;
  isCompleted?: boolean;
};

type TInitialState = {
  todos: TTodo[];
};

const initialState: TInitialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TTodo>) => {
      state.todos.push({
        ...action.payload,
        id: crypto.randomUUID(),
        isCompleted: false,
      });
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<TTodo>) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }
        return todo;
      });
    },
  },
});

export default todoSlice.reducer;

export const { addTodo, deleteTodo,editTodo } = todoSlice.actions;
