import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TTodo = {
  _id?: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  priority: string;
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
        isCompleted: false,
      });
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },

    editTodo: (state, action: PayloadAction<TTodo>) => {
      state.todos = state.todos.map((todo) => {
        if (todo._id === action.payload._id) {
          return action.payload;
        }
        return todo;
      });
    },

    toggleComplete: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.map((todo) => {
        if (todo._id === action.payload) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return todo;
      });
    },
  },
});

export default todoSlice.reducer;

export const { addTodo, deleteTodo, editTodo, toggleComplete } =
  todoSlice.actions;
