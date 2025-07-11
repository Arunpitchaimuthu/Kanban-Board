import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changedTask,
  editTask,
  taskOptionClicked,
  updateTask,
} from "../redux/KanbanSlice";

function EditTask() {
  const kanban = useSelector((state) => state.kanban);
  const dispatch = useDispatch();

  const [value, setValue] = useState(null);

  const [title, setTitle] = useState(
    kanban.boards[kanban.activeBoard].columns[kanban.taskColumn].tasks[
      kanban.taskClicked
    ].title
  );

  const [description, setDescription] = useState(
    kanban.boards[kanban.activeBoard].columns[kanban.taskColumn].tasks[
      kanban.taskClicked
    ].description
  );

  const [subArray, setSubArray] = useState(
    kanban.boards[kanban.activeBoard].columns[kanban.taskColumn].tasks[
      kanban.taskClicked
    ].subtasks.map((item) => {
      return item;
    })
  );
  const [error, setError] = useState("");

  const data = subArray.filter((item) => {
    return item.name;
  });

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

  const datas = kanban.boards
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
      dispatch(editTask());
      dispatch(changedTask({ value, data: datas[0], newData: allData }));
    }
  }, [value]);

  function addSubtask() {
    const abc = [...subArray, { name: "", checked: false }];
    setSubArray(abc);
  }

  function handleChange(e, id) {
    const finalData = subArray.map((item, index) => {
      if (id === index) {
        return {
          ...item,
          name: e.target.value,
        };
      } else {
        return item;
      }
    });
    setSubArray(finalData);
  }

  function removeInput(id) {
    const newArray = subArray.filter((item, index) => index !== id);
    setSubArray(newArray);
  }

  function createTask() {
    if (title.trim() !== "" && data.length === subArray.length) {
      dispatch(updateTask({ title, description, subArray }));
      dispatch(editTask());
      setError((prev) => (prev = ""));
    } else {
      setError((prev) => (prev = "Can't be Empty"));
    }
  }

  return (
    <div className="add_popupbg" onClick={() => dispatch(editTask())}>
      <div className="add-popup">
        <div
          id="add_popup"
          onClick={() => dispatch(editTask())}
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
              Edit Task
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
              {subArray.map((item, index) => {
                return (
                  <div className="sub-task-inputs" id="input_boxes" key={index}>
                    <input
                      id="subtasks_input"
                      type="text"
                      value={item.name}
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
          <button id="create_task" onClick={createTask}>
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
