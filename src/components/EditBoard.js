import React, { useState } from "react";
import { editBoard, optionClicked, updateBoard } from "../redux/KanbanSlice";
import { useDispatch, useSelector } from "react-redux";

function EditBoard() {
  const kanban = useSelector((state) => state.kanban);
  const dispatch = useDispatch();

  const [board, setBoard] = useState(kanban.boards[kanban.activeBoard].name);
  const [columns, setColumns] = useState(
    kanban.boards[kanban.activeBoard].columns.map((item) => {
      return item;
    })
  );
  const [error, setError] = useState("");

  const data = columns.filter((item) => {
    return item.name;
  });

  function handleChange(e, id) {
    const finalData = columns.map((item, index) => {
      if (index === id) {
        return {
          ...item,
          name: e.target.value,
        };
      } else {
        return item;
      }
    });
    setColumns(finalData);
  }

  function saveChanges(e) {
    e.preventDefault();
    if (board.trim() !== "" && data.length === columns.length) {
      dispatch(updateBoard({ board, columns }));
      dispatch(editBoard());
      setError((prev) => (prev = ""));
    } else {
      setError((prev) => (prev = "Can't be Empty"));
    }
    if (kanban.boardToggle) {
      dispatch(optionClicked());
    }
  }

  function addColumns(e) {
    e.preventDefault();
    const abc = [...columns, { name: "", tasks: [] }];
    setColumns(abc);
  }

  function removeInput(id) {
    const newArray = columns.filter((item, index) => index !== id);
    setColumns(newArray);
  }

  return (
    <div className="add_popupbg" onClick={() => dispatch(editBoard())}>
      <div className="create-popup">
        <div
          id="create_popup"
          onClick={() => dispatch(editBoard())}
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
              Edit board
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
                {columns.map((item, index) => {
                  return (
                    <div
                      className="board_input"
                      id="board_input_boxes"
                      key={index}
                    >
                      <input
                        id="board_columns_input"
                        type="text"
                        value={item.name}
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
              <button id="create_new_board" onClick={saveChanges}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditBoard;
