import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";
import AddTask from "./components/AddTask";
import CreateNewBoard from "./components/CreateNewBoard";
import CenterList from "./components/CenterList";
import ViewTask from "./components/ViewTask";
import Options from "./components/Options";
import EditBoard from "./components/EditBoard";
import TaskOptions from "./components/TaskOptions";
import EditTask from "./components/EditTask";
import { createBoard } from "./redux/KanbanSlice";

function App() {
  const kanban = useSelector((state) => state.kanban);
  const dispatch = useDispatch();

  return (
    <div>
      {kanban.boards.length ? (
        <div className="app">
          <SideNav />
          <div className="center_content">
            <TopNav />
            {kanban.boardToggle ? <Options /> : ""}
            {kanban.addTask ? <AddTask /> : ""}
            {kanban.editBoardBtn ? <EditBoard /> : ""}
            {kanban.editTaskBtn ? <EditTask /> : ""}
            <CenterList />
            {kanban.viewTask ? <ViewTask /> : ""}
            {kanban.taskToggle ? <TaskOptions /> : ""}
          </div>
        </div>
      ) : (
        <div
          className="no-board"
          style={{
            backgroundColor: kanban.allToggle ? "#2b2c37" : "white",
          }}
        >
          <p>
            There are no boards available. Create a new board to get Started.
          </p>
          <button
            id="add_task"
            style={{
              backgroundColor: kanban.allToggle ? "#fafbff" : "",
              color: kanban.allToggle ? "#635fc7" : "",
            }}
            onClick={() => dispatch(createBoard())}
          >
            + Add New Board
          </button>
        </div>
      )}
      {kanban.createBoardBtn ? <CreateNewBoard /> : ""}
    </div>
  );
}

export default App;
