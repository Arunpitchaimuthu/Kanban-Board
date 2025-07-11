import React, { useEffect, useState } from "react";
import Option from "../assets/Option icon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  changedTask,
  checkedChange,
  inputChange,
  taskOptionClicked,
  viewOption,
  viewPopup,
} from "../redux/KanbanSlice";

function ViewTask() {
  const kanban = useSelector((state) => state.kanban);
  const dispatch = useDispatch();

  const [value, setValue] = useState(null);

  const allData = kanban.boards[kanban.activeBoard].columns[
    kanban.taskColumn
  ].tasks.filter((task, index) => {
    return (
      task !==
      kanban.boards[kanban.activeBoard].columns[kanban.taskColumn].tasks[
        kanban.taskClicked
      ]
    );
  });

  const data = kanban.boards
    .filter((board) => {
      return board.name === kanban.boards[kanban.activeBoard].name;
    })[0]
    .columns.map((item, index) => {
      if (index === kanban.taskColumn) {
        return item.tasks[kanban.taskClicked];
      }
    })
    .filter((value) => {
      return value !== undefined;
    });

  useEffect(() => {
    if (value) {
      dispatch(viewPopup());
      dispatch(changedTask({ value, data: data[0], newData: allData }));
    }
  }, [value]);

  useEffect(() => {
    const task = data[0].subtasks.filter((item) => item.checked);
    dispatch(checkedChange(task.length));
  }, [data[0].subtasks]);

  function news(id) {
    const changedData = data[0].subtasks.map((task, index) => {
      if (id === index) {
        return { ...task, checked: !task.checked };
      } else {
        return task;
      }
    });
    dispatch(inputChange({ ...data[0], subtasks: changedData }));
  }

  function handleTaskOption() {
    dispatch(taskOptionClicked());
  }

  function viewPop() {
    dispatch(viewPopup());
    if (!kanban.viewTask) {
      dispatch(taskOptionClicked());
    } else {
      dispatch(taskOptionClicked());
      if (!kanban.taskToggle) {
        dispatch(taskOptionClicked());
      }
    }
  }

  function view_Popup() {
    dispatch(viewPopup());
  }

  return (
    <div className="add_popupbg" onClick={viewPop}>
      <div
        id="view_popup"
        onClick={view_Popup}
        style={{
          backgroundColor: kanban.allToggle ? "#2b2c37" : "white",
        }}
      >
        <div id="view_head">
          <p
            id="view_title"
            style={{
              color: kanban.allToggle ? "white" : "black",
            }}
          >
            {data[0].title}
          </p>
          <img
            id="view_option_icon"
            src={Option}
            alt="Option Icon"
            height="20px"
            onClick={handleTaskOption}
          />
        </div>
        <p id="view_description">{data[0].description}</p>
        <div id="view_subtask_content">
          <p id="view_subtask_title">Subtasks</p>
          <p id="view_pending_tasks">
            ({data[0].checkedCount} of {data[0].subtasks.length})
          </p>
        </div>
        <div id="overall_view_subtasks">
          {data[0].subtasks.map((task, index) => {
            return (
              <div
                id="view_subtasks"
                key={index}
                style={{
                  backgroundColor: kanban.allToggle ? "#20212c" : "",
                  color: kanban.allToggle ? "white" : "",
                }}
              >
                <input
                  type="checkbox"
                  id="view_check"
                  checked={task.checked}
                  onChange={() => news(index)}
                />
                <p
                  id="view_task"
                  style={
                    task.checked
                      ? { textDecoration: "line-through", color: "#84909d" }
                      : { textDecoration: "", color: "" }
                  }
                >
                  {task.name}
                </p>
              </div>
            );
          })}
        </div>
        <div id="view_bottom">
          <p id="view_current_status">Current status</p>
          <select
            id="view_select"
            onChange={(e) => setValue(e.target.value)}
            style={{
              backgroundColor: kanban.allToggle ? "#2b2c37" : "",
              color: kanban.allToggle ? "white" : "",
            }}
          >
            {kanban.boards
              .filter((board) => {
                return board.name === kanban.boards[kanban.activeBoard].name;
              })[0]
              .columns.map((value, index) => {
                if (index !== kanban.taskColumn) {
                  return (
                    <option key={index} value={index}>
                      {value.name}
                    </option>
                  );
                } else {
                  return (
                    <option key={index} value={index} selected>
                      {value.name}
                    </option>
                  );
                }
              })}
          </select>
        </div>
      </div>
    </div>
  );
}

export default ViewTask;
