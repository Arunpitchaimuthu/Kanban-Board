import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBoard,
  editBoard,
  optionClicked,
  selectedBoard,
} from "../redux/KanbanSlice";

function Options() {
  const kanban = useSelector((state) => state.kanban);
  const dispatch = useDispatch();

  function deleteboard() {
    const newKanban = kanban.boards.filter((board) => {
      return board !== kanban.boards[kanban.activeBoard];
    });
    dispatch(deleteBoard(newKanban));
    dispatch(optionClicked());
    dispatch(selectedBoard(0));
  }

  return (
    <div
      className="options"
      style={{
        backgroundColor: kanban.allToggle ? "#20212c" : "white",
      }}
    >
      <button
        className="edit_board"
        onClick={() => dispatch(editBoard())}
        style={{
          backgroundColor: kanban.allToggle ? "#20212c" : "white",
        }}
      >
        Edit Board
      </button>
      <button
        className="delete_board"
        onClick={deleteboard}
        style={{
          backgroundColor: kanban.allToggle ? "#20212c" : "white",
        }}
      >
        Delete Board
      </button>
    </div>
  );
}

export default Options;
