import { useState } from "react";
import { Box, AppBar, Stack } from "@mui/material";
import ToolBar from "./ToolBar";
import Month from "./Month";
import Week from "./Week";
import Day from "./Day";
import AddTask from "./AddTask";
import Login from "./Login";

function View() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [openAddTask, setOpenAddTask] = useState(false);
  const [viewMode, setViewMode] = useState("month");
  const [filter, setFilter] = useState([]);
  const [sorter, setSorter] = useState([]);
  const [tags, setTags] = useState([
    { tag: "WP", group: "Subject" },
    { tag: "ALG", group: "Subject" },
    { tag: "Test", group: "Type" },
    { tag: "Exam", group: "Type" },
    { tag: "Important", group: "Other" },
  ]);
  const curDate = new Date()
  const [viewTime, setViewTime] = useState({ year:curDate.getFullYear() , month: curDate.getMonth()+1, date: curDate.getDate() });
  const [viewTasks, setViewTasks] = useState([]);
  const [addTaskTime, setAddTaskTime] = useState({ year:curDate.getFullYear() , month: curDate.getMonth()+1, date: curDate.getDate() });

  const view = () => {
    if (viewMode === "month") {
      return (
        <div>
          <Month
            tags={tags}
            viewTime={viewTime}
            viewTasks={viewTasks}
            viewMode={viewMode}
            setViewTime={setViewTime}
            setViewMode={setViewMode}
            setOpenAddTask={setOpenAddTask}
            setAddTaskTime={setAddTaskTime}
          />
        </div>
      );
    } else if (viewMode === "day") {
      return (
        <Day
          viewTime={viewTime}
          viewTasks={viewTasks}
          viewMode={viewMode}
          setViewTime={setViewTime}
          setViewMode={setViewMode}
        />
      );
    }
  };

  return (
    <div>
      {loggedIn ? (
        <Stack direction="column" overflow="hidden">
          <ToolBar
            viewMode={viewMode}
            setViewMode={setViewMode}
            setOpenAddTask={setOpenAddTask}
            tags={tags}
            setTags={setTags}
            setViewTasks={setViewTasks}
            email={email}
            setLoggedIn={setLoggedIn}
            filter={filter}
            setFilter={setFilter}
            sorter={sorter}
            setSorter={setSorter}
          />
          <AddTask
            openAddTask={openAddTask}
            setOpenAddTask={setOpenAddTask}
            tags={tags}
            states={["not started", "done"]}
            email={email}
            viewTasks={viewTasks}
            setViewTasks={setViewTasks}
            filter={filter}
            sorter={sorter}
            curTime={new Date(addTaskTime.year, addTaskTime.month-1, addTaskTime.date)}
          />
          {view()}
        </Stack>
      ) : (
        <Login
          setLoggedIn={setLoggedIn}
          changeEmail={setEmail}
          setTags={setTags}
          setViewTasks={setViewTasks}
        ></Login>
      )}
    </div>
  );
}

export default View;
