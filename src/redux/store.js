import { configureStore } from "@reduxjs/toolkit";
import kanbanReducer from "./KanbanSlice";

export const store = configureStore({
  reducer: {
    kanban: kanbanReducer,
  },
});
