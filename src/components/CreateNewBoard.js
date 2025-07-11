import React, { useState } from "react";
import { addBoard, createBoard, sideNavClicked } from "../redux/KanbanSlice";
import { useDispatch, useSelector } from "react-redux";

function CreateNewBoard() {
  const kanban = useSelector((state) => state.kanban);
  const dispatch = useDispatch();

  const [board, setBoard] = useState("");
  const [columns, setColumns] = useState([
    { name: "Todo", tasks: [] },
    { name: "Doing", tasks: [] },
  ]);
  const [error, setError] = useState("");

  const data = columns.filter((item) => {
    return item.name;
  });

  function addColumns(e) {
    e.preventDefault();
    const abc = [...columns, {}];
    setColumns(abc);
  }

  function handleChange(e, index) {
    const inputData = [...columns];
    inputData[index].name = e.target.value;
    inputData[index].tasks = [];
    setColumns(inputData);
  }

  function removeInput(id) {
    const newArray = columns.filter((item, index) => index !== id);
    setColumns(newArray);
  }

  function createTask(e) {
    e.preventDefault();
    if (board.trim() !== "" && data.length === columns.length) {
      dispatch(addBoard({ board, columns }));
      dispatch(createBoard());
      if (!kanban.sideNav) {
        dispatch(sideNavClicked());
      }
      setError((prev) => (prev = ""));
    } else {
      setError((prev) => (prev = "Can't be Empty"));
    }
  }

  return (
    <div className="add_popupbg" onClick={() => dispatch(createBoard())}>
      <div className="create-popup">
        <div
          id="create_popup"
          onClick={() => dispatch(createBoard())}
          style={{
            backgroundColor: kanban.allToggle ? "#2b2c37" : "white",
          }}
        >
          <div id="create_new_task">
            <p
              id="create_new_task_title"
              style={{
                color: kanban.allToggle ? "white" : "black",
              }}
            >
              Add new board
            </p>
          </div>
          <form id="createForm">
            <div className="board_name_and_error">
              <p id="board_name_title">Board Name</p>
              <p className="board_error">{board.length ? "" : error}</p>
            </div>
            <input
              id="board_name"
              type="text"
              placeholder="e.g.Web Design"
              value={board}
              onChange={(e) => setBoard(e.target.value)}
              style={{
                backgroundColor: kanban.allToggle ? "#2b2c37" : "white",
                color: kanban.allToggle ? "white" : "black",
              }}
            />
            <div id="board_columns">
              <div className="sub_name_and_error">
                <p id="board_columns_title">Board Columns</p>
                <p className="sub_error">
                  {data.length === columns.length ? "" : error}
                </p>
              </div>
              <div id="board_inputs">
                {columns.map((columns, index) => {
                  return (
                    <div
                      className="board_input"
                      id="board_input_boxes"
                      key={index}
                    >
                      <input
                        id="board_columns_input"
                        type="text"
                        value={columns.name}
                        onChange={(e) => handleChange(e, index)}
                        style={{
                          backgroundColor: kanban.allToggle
                            ? "#2b2c37"
                            : "white",
                          color: kanban.allToggle ? "white" : "black",
                        }}
                      />
                      <p
                        className="remove_board"
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
                id="add_new_column"
                onClick={addColumns}
                style={{
                  backgroundColor: kanban.allToggle ? "#fafbff" : "",
                  color: kanban.allToggle ? "#635fc7" : "",
                }}
              >
                +Add New Column
              </button>
              <button id="create_new_board" onClick={createTask}>
                Create New Board
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNewBoard;
