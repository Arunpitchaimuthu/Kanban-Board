import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideNav: true,
  allToggle: false,
  boardToggle: false,
  taskToggle: false,
  createBoardBtn: false,
  editBoardBtn: false,
  editTaskBtn: false,
  activeBoard: 0,
  taskColumn: 0,
  taskClicked: 0,
  addTask: false,
  viewTask: false,
  boards: [
    {
      name: "Platform Launch",
      columns: [
        {
          name: "Todo",
          tasks: [
            {
              name: "Todo",
              title: "Build UI for onboarding flow",
              description: "",
              checkedCount: 0,
              subtasks: [
                {
                  name: "Sign up page",
                  checked: false,
                },
                {
                  name: "Sign in page",
                  checked: false,
                },
                {
                  name: "Welcome page",
                  checked: false,
                },
              ],
            },
            {
              name: "Todo",
              title: "Build UI for search",
              description: "",
              checkedCount: 1,
              subtasks: [
                {
                  name: "Search Page",
                  checked: true,
                },
              ],
            },
          ],
        },
        {
          name: "Doing",
          tasks: [
            {
              name: "Doing",
              title: "Design settings and search pages",
              description: "",
              checkedCount: 0,
              subtasks: [
                {
                  name: "Settings - Account page",
                  checked: false,
                },
                {
                  name: "Settings - Billing page",
                  checked: false,
                },
                {
                  name: "Search page",
                  checked: false,
                },
              ],
            },
          ],
        },
        {
          name: "Arun",
          tasks: [
            {
              name: "Arun",
              title: "Design settings and search pages",
              description: "",
              checkedCount: 0,
              subtasks: [
                {
                  name: "Settings - Account page",
                  checked: false,
                },
                {
                  name: "Settings - Billing page",
                  checked: false,
                },
                {
                  name: "Search page",
                  checked: false,
                },
              ],
            },
            {
              name: "Arun",
              title: "Design settings and search pages",
              description: "",
              checkedCount: 0,
              subtasks: [
                {
                  name: "Settings - Account page",
                  checked: false,
                },
                {
                  name: "Settings - Billing page",
                  checked: false,
                },
                {
                  name: "Search page",
                  checked: false,
                },
              ],
            },
            {
              name: "Arun",
              title: "Design settings and search pages",
              description: "",
              checkedCount: 0,
              subtasks: [
                {
                  name: "Settings - Account page",
                  checked: false,
                },
                {
                  name: "Settings - Billing page",
                  checked: false,
                },
                {
                  name: "Search page",
                  checked: false,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Marketing plan",
      columns: [
        {
          name: "Todo",
          tasks: [],
        },
        {
          name: "Doing",
          tasks: [],
        },
        {
          name: "Saran",
          tasks: [],
        },
      ],
    },
    {
      name: "Roadmap",
      columns: [
        {
          name: "Todo",
          tasks: [],
        },
        {
          name: "Doing",
          tasks: [],
        },
        {
          name: "Ganesh",
          tasks: [],
        },
      ],
    },
  ],
};

export const kanbanSlice = createSlice({
  name: "Kanban",
  initialState,
  reducers: {
    selectedBoard(state, action) {
      state.activeBoard = action.payload;
    },
    createBoard(state) {
      state.createBoardBtn = !state.createBoardBtn;
    },
    addPopup(state) {
      state.addTask = !state.addTask;
    },
    viewPopup(state) {
      state.viewTask = !state.viewTask;
    },
    selectedTask(state, action) {
      state.taskClicked = action.payload.index;
      state.taskColumn = action.payload.idx;
    },
    inputChange(state, action) {
      state.boards[state.activeBoard].columns[state.taskColumn].tasks[
        state.taskClicked
      ] = action.payload;
    },
    checkedChange(state, action) {
      state.boards[state.activeBoard].columns[state.taskColumn].tasks[
        state.taskClicked
      ].checkedCount = action.payload;
    },
    addTask(state, action) {
      state.boards[state.activeBoard].columns[action.payload.value].tasks.push({
        name: state.boards[state.activeBoard].columns[action.payload.value]
          .name,
        title: action.payload.title,
        description: action.payload.description,
        checkedCount: 0,
        subtasks: action.payload.subArray,
      });
    },
    addBoard(state, action) {
      state.boards.push({
        name: action.payload.board,
        columns: action.payload.columns,
      });
    },
    optionClicked(state) {
      state.boardToggle = !state.boardToggle;
    },
    editBoard(state) {
      state.editBoardBtn = !state.editBoardBtn;
    },
    updateBoard(state, action) {
      state.boards[state.activeBoard].name = action.payload.board;
      state.boards[state.activeBoard].columns = action.payload.columns;
    },
    deleteBoard(state, action) {
      state.boards = action.payload;
    },
    taskOptionClicked(state) {
      state.taskToggle = !state.taskToggle;
    },
    editTask(state) {
      state.editTaskBtn = !state.editTaskBtn;
    },
    updateTask(state, action) {
      state.boards[state.activeBoard].columns[state.taskColumn].tasks[
        state.taskClicked
      ].title = action.payload.title;
      state.boards[state.activeBoard].columns[state.taskColumn].tasks[
        state.taskClicked
      ].description = action.payload.description;
      state.boards[state.activeBoard].columns[state.taskColumn].tasks[
        state.taskClicked
      ].checkedCount = 0;
      state.boards[state.activeBoard].columns[state.taskColumn].tasks[
        state.taskClicked
      ].subtasks = action.payload.subArray;
    },
    deleteViewTask(state, action) {
      state.boards[state.activeBoard].columns[state.taskColumn].tasks =
        action.payload;
    },
    changedTask(state, action) {
      state.boards[state.activeBoard].columns[action.payload.value].tasks.push(
        action.payload.data
      );
      state.boards[state.activeBoard].columns[state.taskColumn].tasks =
        action.payload.newData;
    },
    allToggleClicked(state) {
      state.allToggle = !state.allToggle;
    },
    sideNavClicked(state) {
      state.sideNav = !state.sideNav;
    },
    dragEvent(state, action) {
      state.boards[state.activeBoard].columns[
        action.payload.dragOverItem
      ].tasks.push(action.payload.draggedItem);
    },
    deleteEvent(state, action) {
      state.boards[state.activeBoard].columns[action.payload.dragItem].tasks =
        action.payload.data;
    },
  },
});

export const {
  dragEvent,
  deleteEvent,
  selectedBoard,
  sideNavClicked,
  createBoard,
  editBoard,
  editTask,
  updateBoard,
  updateTask,
  deleteBoard,
  deleteViewTask,
  addPopup,
  viewPopup,
  selectedTask,
  inputChange,
  checkedChange,
  addTask,
  addBoard,
  optionClicked,
  taskOptionClicked,
  changedTask,
  allToggleClicked,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;
