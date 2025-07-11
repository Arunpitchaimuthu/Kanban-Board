import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteViewTask,
  editTask,
  taskOptionClicked,
  viewPopup,
} from "../redux/KanbanSlice";

function TaskOptions() {
  const kanban = useSelector((state) => state.kanban);
  const dispatch = useDispatch();

  function handleEditTask() {
    dispatch(editTask());
    dispatch(viewPopup());
    dispatch(taskOptionClicked());
  }

  function deleteTask() {
    const newKanban = kanban.boards[kanban.activeBoard].columns[
      kanban.taskColumn
    ].tasks.filter((task, index) => {
      return (
        task !==
        kanban.boards[kanban.activeBoard].columns[kanban.taskColumn].tasks[
          kanban.taskClicked
        ]
      );
    });
    dispatch(deleteViewTask(newKanban));
    dispatch(viewPopup());
    dispatch(taskOptionClicked());
  }

  return (
    <div
      className="task-options"
      style={{
        backgroundColor: kanban.allToggle ? "#20212c" : "white",
      }}
    >
      <button
        className="edit_board"
        onClick={handleEditTask}
        style={{
          backgroundColor: kanban.allToggle ? "#20212c" : "white",
        }}
      >
        Edit Task
      </button>
      <button
        className="delete_board"
        onClick={deleteTask}
        style={{
          backgroundColor: kanban.allToggle ? "#20212c" : "white",
        }}
      >
        Delete Task
      </button>
    </div>
  );
}

export default TaskOptions;
