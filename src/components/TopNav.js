import React from "react";
import Option from "../assets/Option icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { addPopup, optionClicked } from "../redux/KanbanSlice";

function TopNav() {
  const kanban = useSelector((state) => state.kanban);
  const dispatch = useDispatch();

  function handleOption() {
    dispatch(optionClicked());
  }

  return (
    <div
      className="centre_top"
      style={{
        backgroundColor: kanban.allToggle ? "#2b2c37" : "white",
      }}
    >
      <div id="centre_heading">
        <p
          id="selected_content"
          style={{
            color: kanban.allToggle ? "white" : "black",
          }}
        >
          {kanban.boards[kanban.activeBoard].name}
        </p>
      </div>
      <div id="add_and_options">
        <button
          id="add_task"
          onClick={() => dispatch(addPopup())}
          disabled={!kanban.boards[kanban.activeBoard].columns.length}
        >
          + Add New Task
        </button>
        <img
          id="option_img"
          src={Option}
          alt="Option Icon"
          height="25px"
          onClick={handleOption}
        />
      </div>
    </div>
  );
}

export default TopNav;
