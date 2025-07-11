import React from "react";
import Title from "./Title";
import Boards from "./Boards";
import Visible from "../assets/Visible.webp";
import { useDispatch, useSelector } from "react-redux";
import { sideNavClicked } from "../redux/KanbanSlice";

function SideNav() {
  const kanban = useSelector((state) => state.kanban);
  const dispatch = useDispatch();

  return (
    <div
      className="sidenav"
      style={{
        backgroundColor: kanban.allToggle ? "#2b2c37" : "white",
      }}
    >
      <Title />
      {kanban.sideNav ? (
        <Boards />
      ) : (
        <div className="showicon" onClick={() => dispatch(sideNavClicked())}>
          <img src={Visible} alt="Hide Icon" height="25px" width="25px" />
        </div>
      )}
    </div>
  );
}

export default SideNav;
