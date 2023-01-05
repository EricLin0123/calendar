import React from "react";
import {
  IconButton,
  Avatar,
  Fab,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete,
  TextField,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TagManager from "./TagManager";
import TaskManager from "./TaskManager";
import { FilterTask, SortTask } from "./Connect";
const GetFilter = (email, filter, setViewTasks, setFilter) => {
  var objFilter = {};
  var newFilter = [];
  var category = [];
  for (var i = 0; i < filter.length; i++) {
    if (category.includes(filter[i].group)) {
      objFilter[filter[i].group].push(filter[i].tag);
    } else {
      category.push(filter[i].group);
      objFilter[filter[i].group] = [filter[i].tag];
    }
  }
  for (var i = 0; i < category.length; i++) {
    newFilter.push({ tagType: category[i], element: objFilter[category[i]] });
  }
  setFilter(newFilter);
  console.log(newFilter);
  FilterTask(email, newFilter)
    .then((response) => {
      if (response.status === "error") throw response.message;
      const data = response.message;
      const tasks = data.map((task) => {
        return {
          name: task.name,
          type: task.taskType,
          state: task.state ? task.state : "null",
          id: task._id,
          description: task.description,
          includeInterval: task.endTime ? true : false,
          includeTime: !task.allDay,
          startDate: new Date(task.startTime),
          endDate: new Date(task.endTime),
          tags: task.tag.map((tagObj) => ({
            tag: tagObj.element,
            group: tagObj.tagType,
          })),
        };
      });
      console.log(tasks);
      setViewTasks(tasks); //comment this line to get template tasks
    })
    .catch((e) => alert(e));
};
const GetSorter = (email, sorter, setViewTasks, setSorter) => {
  setSorter(sorter);
  console.log(sorter);
  SortTask(email, sorter)
    .then((response) => {
      if (response.status === "error") throw response.message;
      const data = response.message;
      const tasks = data.map((task) => {
        return {
          name: task.name,
          type: task.taskType,
          state: task.state ? task.state : "null",
          id: task._id,
          description: task.description,
          includeInterval: task.endTime ? true : false,
          includeTime: !task.allDay,
          startDate: new Date(task.startTime),
          endDate: task.endTime ? new Date(task.endTime) : new Date(0),
          tags: task.tag.map((tagObj) => ({
            tag: tagObj.element,
            group: tagObj.tagType,
          })),
        };
      });
      console.log(tasks);
      setViewTasks(tasks); //comment this line to get template tasks
    })
    .catch((e) => alert(e));
};
function ToolBar({
  viewMode,
  setViewMode,
  setOpenAddTask,
  tags,
  setTags,
  email,
  setViewTasks,
  setLoggedIn,
  setFilter,
  setSorter,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        padding="20px"
        height="35px"
        width="calc(100vw-40px)"
        sx={{ backgroundColor: "secondary.lighter" }}
      >
        {/* view mode */}
        <ToggleButtonGroup>
          <ToggleButton>month</ToggleButton>
          <ToggleButton>day</ToggleButton>
          <ToggleButton>tags</ToggleButton>
        </ToggleButtonGroup>

        {/* viewing options */}
        <Stack
          spacing={1}
          direction="row"
          sx={{ width: "750px" }}
          alignItems="flex-start"
          alignSelf="flex-start"
        >
          {/* filter */}
          <Stack spacing={3} sx={{ width: "220px" }}>
            <Autocomplete
              ListboxProps={{
                style: { maxHeight: "400px", fontSize: "small" },
              }}
              size="small"
              limitTags={1}
              multiple
              id="filter-auto"
              options={tags}
              getOptionLabel={(option) => option.tag}
              groupBy={(option) => option.group}
              defaultValue={[]}
              onChange={(e, value) => {
                GetFilter(email, value, setViewTasks, setFilter);
              }}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Filter"
                  size="small"
                  maxRows={1}
                  height="30px"
                />
              )}
            />
          </Stack>

          {/* sort */}
          <Stack spacing={3} sx={{ width: "220px" }}>
            <Autocomplete
              ListboxProps={{
                style: { maxHeight: "400px", fontSize: "small" },
              }}
              size="small"
              limitTags={1}
              multiple
              id="filter-auto"
              options={tags}
              getOptionLabel={(option) => option.tag}
              groupBy={(option) => option.group}
              defaultValue={[]}
              onChange={(e, value) => {
                GetSorter(email, value, setViewTasks, setSorter);
              }}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Sorting"
                  size="small"
                  maxRows={1}
                  height="30px"
                />
              )}
            />
          </Stack>

          {/* column */}
          <Stack spacing={3} sx={{ width: "220px" }}>
            <Autocomplete
              ListboxProps={{
                style: { maxHeight: "400px", fontSize: "small" },
              }}
              size="small"
              limitTags={1}
              multiple
              id="filter-auto"
              options={tags}
              getOptionLabel={(option) => option.tag}
              groupBy={(option) => option.group}
              defaultValue={[]}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Column"
                  size="small"
                  maxRows={1}
                  height="30px"
                />
              )}
            />
          </Stack>
        </Stack>

        {/* buttons */}
        <Stack spacing={1} direction="row" alignItems="center">
          <TaskManager setOpenAddTask={setOpenAddTask} />
          <TagManager tags={tags} setTags={setTags} email={email} />

          <IconButton
            onClick={handleProfileClick}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{ backgroundColor: "primary.main", width: 45, height: 45 }}
            >
              {email[0].toUpperCase()}
            </Avatar>
          </IconButton>
        </Stack>

        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleProfileClose}
          MenuListProps={{
            "aria-labelledby": "profile-button",
          }}
        >
          <MenuItem onClick={() => setLoggedIn(false)}>
            Log into another account
          </MenuItem>
          <MenuItem onClick={() => setLoggedIn(false)}>Log out</MenuItem>
        </Menu>
      </Stack>
    </div>
  );
}

export default ToolBar;
