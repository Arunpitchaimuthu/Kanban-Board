import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBarIcon from "../assets/Sidebar icon.svg";
import Sun from "../assets/Sun icon.svg";
import Moon from "../assets/Moon Icon.svg";
import Hide from "../assets/Hide Icon.svg";
import {
  allToggleClicked,
  createBoard,
  selectedBoard,
  sideNavClicked,
} from "../redux/KanbanSlice";

function Boards() {
  const kanban = useSelector((state) => state.kanban);
  const dispatch = useDispatch();

  function hideSidebar() {
    dispatch(sideNavClicked());
  }

  return (
    <div
      className="boards"
      style={{
        backgroundColor: kanban.allToggle ? "#2b2c37" : "white",
      }}
    >
      <div className="all_boards">
        <p className="all_boards_title">ALL BOARDS</p>
        <p id="all_boards_total">({kanban.boards.length})</p>
      </div>
      <div id="sidebars">
        {kanban.boards.map((item, index) => {
          return (
            <div
              key={index}
              className="sidebar_dropdowns"
              onClick={() => dispatch(selectedBoard(index))}
              style={
                kanban.allToggle === false
                  ? kanban.activeBoard === index
                    ? { backgroundColor: "#635fc7", color: "white" }
                    : { backgroundColor: "white", color: "#9fa9b8" }
                  : kanban.activeBoard === index
                  ? { backgroundColor: "#635fc7", color: "white" }
                  : { backgroundColor: "#2b2c37", color: "#9fa9b8" }
              }
            >
              <img src={SideBarIcon} alt="Sidebar Icon" height="20px" />
              <p id="sidebar_boards">{item.name}</p>
            </div>
          );
        })}
        <div id="create_board" onClick={() => dispatch(createBoard())}>
          <img
            id="create_board_img"
            src={SideBarIcon}
            alt="Sidebar Icon"
            height="20px"
          />
          <p id="create_board_title">+Create New Board</p>
        </div>
      </div>
      <div
        className="mode"
        style={{
          backgroundColor: kanban.allToggle ? "#20212c" : "",
        }}
      >
        <img id="light" src={Sun} alt="Light Icon" height="22px" width="20px" />
        <div className="btn-group">
          <button
            id="monthly_btn"
            style={{ backgroundColor: kanban.allToggle ? "#635fc7" : "white" }}
            onClick={() => dispatch(allToggleClicked())}
          ></button>
          <button
            id="yearly_btn"
            style={{ backgroundColor: kanban.allToggle ? "white" : "#635fc7" }}
            onClick={() => dispatch(allToggleClicked())}
          ></button>
        </div>
        <img id="dark" src={Moon} alt="Dark Icon" height="22px" width="20px" />
      </div>
      <div className="hide_sidebar" onClick={hideSidebar}>
        <img id="hide_img" src={Hide} alt="Hide Icon" height="20px" />
        <p className="hide">Hide Sidebar</p>
      </div>
    </div>
  );
}

export default Boards;
