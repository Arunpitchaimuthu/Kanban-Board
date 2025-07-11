import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopup, addTask } from "../redux/KanbanSlice";

function AddTask() {
  const kanban = useSelector((state) => state.kanban);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subArray, setSubArray] = useState([{}, {}]);
  const [value, setValue] = useState(0);
  const [error, setError] = useState("");

  const data = subArray.filter((item) => {
    return item.name;
  });

  function addSubtask() {
    const abc = [...subArray, {}];
    setSubArray(abc);
  }

  function handleChange(e, index) {
    const inputData = [...subArray];
    inputData[index].name = e.target.value;
    inputData[index].checked = false;
    setSubArray(inputData);
  }

  function removeInput(id) {
    const newArray = subArray.filter((item, index) => index !== id);
    setSubArray(newArray);
  }

  function createTask() {
    if (title.trim() !== "" && data.length === subArray.length) {
      dispatch(addTask({ title, description, subArray, value }));
      dispatch(addPopup());
      setError((prev) => (prev = ""));
    } else {
      setError((prev) => (prev = "Can't be Empty"));
    }
  }

  return (
    <div className="add_popupbg" onClick={() => dispatch(addPopup())}>
      <div className="add-popup">
        <div
          id="add_popup"
          onClick={() => dispatch(addPopup())}
          style={{
            backgroundColor: kanban.allToggle ? "#2b2c37" : "white",
          }}
        >
          <div id="add_new_task">
            <p
              id="add_new_task_title"
              style={{
                color: kanban.allToggle ? "white" : "black",
              }}
            >
              Add New Task
            </p>
          </div>
          <div className="task_name_and_error">
            <p id="task_name_title">Task Name</p>
            <p className="title_error">{title.length ? "" : error}</p>
          </div>
          <div>
            <input
              id="task_name"
              type="text"
              placeholder="e.g.Take coffee break"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                backgroundColor: kanban.allToggle ? "#2b2c37" : "white",
                color: kanban.allToggle ? "white" : "black",
              }}
            />
            <div></div>
          </div>
          <p id="description_title">Description</p>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              backgroundColor: kanban.allToggle ? "#2b2c37" : "white",
              color: kanban.allToggle ? "white" : "black",
            }}
          ></textarea>
          <div id="subtasks">
            <div className="sub_name_and_error">
              <p id="subtasks_title">Subtasks</p>
              <p className="sub_error">
                {data.length === subArray.length ? "" : error}
              </p>
            </div>
            <div id="inputs">
              {subArray.map((task, index) => {
                return (
                  <div className="sub-task-inputs" id="input_boxes" key={index}>
                    <input
                      id="subtasks_input"
                      type="text"
                      onChange={(e) => handleChange(e, index)}
                      style={{
                        backgroundColor: kanban.allToggle ? "#2b2c37" : "white",
                        color: kanban.allToggle ? "white" : "black",
                      }}
                    />
                    <p
                      className="removes"
                      id="close"
                      onClick={() => removeInput(index)}
                    >
                      &#x2715;
                    </p>
                  </div>
                );
              })}
            </div>
            <button
              id="add_new_subtask"
              onClick={addSubtask}
              style={{
                backgroundColor: kanban.allToggle ? "#fafbff" : "",
                color: kanban.allToggle ? "#635fc7" : "",
              }}
            >
              +Add New Subtask
            </button>
          </div>
          <div id="options">
            <p id="current_status">Current Status</p>
            <select
              id="actions"
              onChange={(e) => setValue(e.target.value)}
              style={{
                backgroundColor: kanban.allToggle ? "#2b2c37" : "white",
                color: kanban.allToggle ? "white" : "black",
              }}
            >
              {kanban.boards
                .filter((board) => {
                  return board.name === kanban.boards[kanban.activeBoard].name;
                })[0]
                .columns.map((item, index) => {
                  return (
                    <option key={index} value={index}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <button id="create_task" onClick={createTask}>
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
