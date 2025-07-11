import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEvent,
  deleteViewTask,
  dragEvent,
  editBoard,
  selectedTask,
  viewPopup,
} from "../redux/KanbanSlice";

function CenterList() {
  const kanban = useSelector((state) => state.kanban);
  const dispatch = useDispatch();

  const dragItem = useRef();
  const draggedItem = useRef();
  const dragOverItem = useRef();

  function handleStart(idx, task) {
    dragItem.current = idx;
    draggedItem.current = task;
  }

  function handleEnter(idx, task) {
    dragOverItem.current = idx;
  }

  function handleSort() {
    const newKanban = kanban.boards[kanban.activeBoard].columns[
      dragItem.current
    ].tasks.filter((task, index) => {
      return task !== draggedItem.current;
    });

    dispatch(
      deleteEvent({
        dragItem: dragItem.current,
        data: newKanban,
      })
    );

    dispatch(
      dragEvent({
        dragOverItem: dragOverItem.current,
        draggedItem: draggedItem.current,
      })
    );
  }

  function allTasks(index, idx) {
    dispatch(viewPopup());
    dispatch(selectedTask({ index, idx }));
  }

  return (
    <div
      className="centre_list"
      style={
        kanban.sideNav
          ? { marginLeft: "0rem" }
          : { marginLeft: "-16rem", width: "1126px" }
      }
    >
      <div
        className="overall_list"
        style={{ backgroundColor: kanban.allToggle ? "#20212c" : "" }}
      >
        {kanban.boards
          .filter((board) => {
            return board.name === kanban.boards[kanban.activeBoard].name;
          })[0]
          .columns.map((item, idx) => {
            return (
              <div id="todo" key={idx}>
                <div id="todo_title">
                  <p id="todo_name">{item.name}</p>
                  <p id="todo_count">({item.tasks.length})</p>
                </div>
                <div
                  style={{ height: "400px"}}
                  onDragEnter={() => handleEnter(idx)}
                  onDragEnd={handleSort}
                >
                  {item.tasks?.map((task, index) => {
                    return (
                      <div
                        className="add_contents"
                        style={{
                          backgroundColor: kanban.allToggle
                            ? "#2b2c37"
                            : "white",
                          color: kanban.allToggle ? "white" : "black",
                        }}
                        id="task-1"
                        draggable
                        onDragStart={() => handleStart(idx, task)}
                        key={index}
                        onClick={() => allTasks(index, idx)}
                      >
                        <p id="content_title" className="content_title">
                          {task?.title}
                        </p>
                        <p id="content_tasks">
                          {task?.checkedCount} of {task?.subtasks?.length}{" "}
                          subtasks
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        {kanban.boards.filter((board) => {
          return board.name === kanban.boards[kanban.activeBoard].name;
        })[0].columns.length ? (
          <div
            className="add-column"
            style={{
              backgroundColor: kanban.allToggle ? "#2b2c37" : "",
            }}
            onClick={() => dispatch(editBoard())}
          >
            +New Column
          </div>
        ) : (
          <div className="empty-board">
            <p>The board is empty. Create a new column to get started.</p>
            <button
              id="add_task"
              style={{
                backgroundColor: kanban.allToggle ? "#fafbff" : "",
                color: kanban.allToggle ? "#635fc7" : "",
              }}
              onClick={() => dispatch(editBoard())}
            >
              + Add New Column
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CenterList;
