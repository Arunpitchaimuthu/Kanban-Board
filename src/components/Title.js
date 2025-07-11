import React from "react";
import Kanban from "../assets/Kanban Logo.svg";
import { useSelector } from "react-redux";

function Title() {
  const kanban = useSelector((state) => state.kanban);

  return (
    <div className="logo">
      <div>
        <img
          id="kanban_logo"
          src={Kanban}
          alt="kanban Logo"
          height="30px"
          width="30px"
        />
      </div>
      <div>
        <p
          id="kanban_title"
          style={{
            color: kanban.allToggle ? "white" : "black",
          }}
        >
          Kanban
        </p>
      </div>
    </div>
  );
}

export default Title;
