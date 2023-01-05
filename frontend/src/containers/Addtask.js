import { useState, useEffect } from "react";
import {
  IconButton,
  TextField,
  Stack,
  Tooltip,
  Card,
  Modal,
  Switch,
  FormGroup,
  FormControlLabel,
  Typography,
  Chip,
  Divider,
  Autocomplete,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { CreateTask, SortTask, FilterTask } from "./Connect";

function AddTask({
  openAddTask,
  setOpenAddTask,
  tags,
  states,
  curTime,
  email,
  viewTasks,
  setViewTasks,
  filter,
  sorter,
}) {
  // const curTime = new Date(1999, 6, 5, 17, 30); //DELETE THIS
  const [startDate, setStartDate] = useState(dayjs(curTime));
  const [endDate, setEndDate] = useState(dayjs(curTime));
  const [startTime, setStartTime] = useState(dayjs(curTime));
  const [endTime, setEndTime] = useState(dayjs(curTime));
  const [includeInterval, setIncludeInterval] = useState(false);
  const [includeTime, setIncludeTime] = useState(false);

  const [repeat, setRepeat] = useState(1);
  const [autoNumbering, setAutoNumbering] = useState(false);
  const [startDates, setStartDates] = useState([]);
  const [endDates, setEndDates] = useState([]);
  const [startTimes, setStartTimes] = useState([]);
  const [endTimes, setEndTimes] = useState([]);
  const [numbering, setNumbering] = useState([]);

  const [tasks, setTasks] = useState([]);
  const [module, setModule] = useState({
    name: "",
    type: "event",
    state: "null",
    id: 0,
    description: "",
    includeInterval: false,
    includeTime: false,
    startDate: curTime,
    endDate: curTime,
    tags: [],
    email: email,
  });

  useEffect(() => {
    setModule({
      name: "",
      type: "event",
      state: "null",
      id: 0,
      description: "",
      includeInterval: false,
      includeTime: false,
      startDate: curTime,
      endDate: curTime,
      tags: [],
      email: email,
    });
    setStartDate(dayjs(curTime));
    setStartTime(dayjs(curTime));
    setEndDate(dayjs(curTime));
    setEndTime(dayjs(curTime));
    setIncludeInterval(false);
    setIncludeTime(false);
    setRepeat(1);
    setAutoNumbering(false);
    setStartDates([]);
    setStartTimes([]);
    setEndDates([]);
    setEndTimes([]);
    setNumbering([]);
    setTasks([]);
  }, [openAddTask]);

  useEffect(() => {
    var ttasks = [];
    var tsd = [];
    var tst = [];
    var ted = [];
    var tet = [];
    var n = [];
    for (var i = 0; i < repeat; i++) {
      ttasks.push({
        name: module.name,
        type: module.type,
        state: module.state,
        id: module.id,
        description: module.description,
        includeInterval: module.includeInterval,
        includeTime: module.includeTime,
        startDate: module.startDate,
        endDate: module.endDate,
        tags: module.tags,
        email: email,
      });
      tsd.push(startDate);
      tst.push(startTime);
      ted.push(endDate);
      tet.push(endTime);
      n.push(i);
    }
    setTasks(ttasks);
    setStartDates(tsd);
    setStartTimes(tst);
    setEndDates(ted);
    setEndTimes(tet);
    setNumbering(n);
  }, [
    module,
    repeat,
    includeInterval,
    includeTime,
    startDate,
    startTime,
    endDate,
    endTime,
  ]);

  const handleSubmit = () => {
    var returnedTasks = [];
    if (repeat > 1) {
      for (var i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        returnedTasks.push({
          name: autoNumbering ? task.name + (i+1).toString() : task.name,
          type: task.type,
          state: task.state,
          id: task.id,
          description: task.description,
          includeInterval: includeInterval,
          includeTime: includeTime,
          startDate: new Date(
            startDates[i].$d.getFullYear(),
            startDates[i].$d.getMonth(),
            startDates[i].$d.getDate(),
            startTimes[i].$d.getHours(),
            startTimes[i].$d.getMinutes()
          ),
          endDate: new Date(
            endDates[i].$d.getFullYear(),
            endDates[i].$d.getMonth(),
            endDates[i].$d.getDate(),
            endTimes[i].$d.getHours(),
            endTimes[i].$d.getMinutes()
          ),
          tags: task.tags,
          email: email,
        });
      }
    } else {
      returnedTasks = [
        {
          name: module.name,
          type: module.type,
          state: module.state,
          id: module.id,
          description: module.description,
          includeInterval: module.includeInterval,
          includeTime: module.includeTime,
          startDate: new Date(
            startDate.$d.getFullYear(),
            startDate.$d.getMonth(),
            startDate.$d.getDate(),
            startTime.$d.getHours(),
            startTime.$d.getMinutes()
          ),
          endDate: new Date(
            endDate.$d.getFullYear(),
            endDate.$d.getMonth(),
            endDate.$d.getDate(),
            endTime.$d.getHours(),
            endTime.$d.getMinutes()
          ),
          tags: module.tags,
          email: email,
        },
      ];
    }
    var checker = 0;
    CreateTask(returnedTasks)
      .then((response) => {
        if (response.status === "error") throw response.message;
        console.log("done");
      })
      .then((response) => FilterTask(email, filter))
      .then((response) => {
        console.log("why");
        if (response.status === "error") throw response.message;
        const data = response.message;
        console.log(data);
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
      .then((response) => SortTask(email, sorter))
      .then((response) => {
        if (response.status === "error") throw response.message;
        console.log(response.message);
        const data = response.message;
        console.log(data);
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
        setViewTasks(tasks);
      })
      .catch((e) => alert(e));
    //setViewTasks([...viewTasks, ...returnedTasks]);
    //console.log(viewTasks);
    setOpenAddTask(false);
  };

  return (
    <div>
      <Modal
        open={openAddTask}
        onClose={() => {
          setOpenAddTask(false);
        }}
      >
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "15px",
            minWidth: "600px",
            padding: "20px",
          }}
        >
          <Stack direction="column" padding="10px" spacing={1}>
            {/* control */}
            <Stack direction="row">
              <FormGroup>
                <Stack direction="row" spacing={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        inputProps={{ "aria-label": "controlled" }}
                        checked={includeInterval}
                        onChange={(input) => {
                          setIncludeInterval(input.target.checked);
                          var mod = {
                            name: module.name,
                            type: module.type,
                            state: module.state,
                            id: 0,
                            description: module.description,
                            includeInterval: module.includeInterval,
                            includeTime: module.includeTime,
                            startDate: new Date(),
                            endDate: new Date(),
                            tags: module.tags,
                            email: module.email,
                          };
                          mod.includeInterval = input.target.checked;
                          setModule(mod);
                        }}
                      />
                    }
                    label="Use time interval"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        inputProps={{ "aria-label": "controlled" }}
                        checked={!includeTime}
                        onChange={(input) => {
                          setIncludeTime(!input.target.checked);
                          var mod = {
                            name: module.name,
                            type: module.type,
                            state: module.state,
                            id: 0,
                            description: module.description,
                            includeInterval: module.includeInterval,
                            includeTime: module.includeTime,
                            startDate: new Date(),
                            endDate: new Date(),
                            tags: module.tags,
                            email: module.email,
                          };
                          mod.includeTime = !input.target.checked;
                          setModule(mod);
                        }}
                      />
                    }
                    label="Use full day"
                  />
                </Stack>
                <TextField
                  label="Number of events or tasks being added"
                  type="number"
                  value={repeat}
                  variant="standard"
                  onChange={(input) => {
                    var num = parseInt(input.target.value);
                    if (num >= 1) {
                      setRepeat(num);
                    }
                  }}
                />
                <Stack direction="row" spacing={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        disabled={repeat <= 1}
                        inputProps={{ "aria-label": "controlled" }}
                        checked={autoNumbering}
                        onChange={(input) => {
                          setAutoNumbering(input.target.checked);
                        }}
                      />
                    }
                    label="Automatically number the events or tasks"
                  />
                </Stack>
              </FormGroup>
            </Stack>
            <Divider />
            {/* form */}
            <Stack direction="column" spacing={2}>
              <Chip
                variant="filled"
                size="medium"
                label={repeat > 1 ? "Build a template." : "Build a new task."}
                sx={{
                  marginTop: "5px",
                  backgroundColor: "primary.darker",
                  color: "white",
                  fontSize: "large",
                }}
              />
              <Stack direction="column" spacing={1}>
                <Stack direction="row" spacing={2} alignItems="center">
                  {/* name */}
                  <TextField
                    label="name"
                    variant="filled"
                    size="small"
                    sx={{ width: "130px" }}
                    onChange={(input) => {
                      var mod = {
                        name: module.name,
                        type: module.type,
                        state: module.state,
                        id: 0,
                        description: module.description,
                        includeInterval: module.includeInterval,
                        includeTime: module.includeTime,
                        startDate: new Date(),
                        endDate: new Date(),
                        tags: module.tags,
                        email: module.email,
                      };
                      mod.name = input.target.value;
                      setModule(mod);
                    }}
                  />
                  {/* type */}
                  <TextField
                    select
                    variant="filled"
                    label="type"
                    size="small"
                    defaultValue="event"
                    sx={{ width: "90px" }}
                    onChange={(input) => {
                      var mod = {
                        name: module.name,
                        type: module.type,
                        state: module.state,
                        id: 0,
                        description: module.description,
                        includeInterval: module.includeInterval,
                        includeTime: module.includeTime,
                        startDate: new Date(),
                        endDate: new Date(),
                        tags: module.tags,
                        email: module.email,
                      };
                      mod.type = input.target.value;
                      setModule(mod);
                    }}
                  >
                    {["event", "task"].map((option) => (
                      <MenuItem value={option}>{option}</MenuItem>
                    ))}
                  </TextField>
                  {/* state */}
                  <TextField
                    select
                    variant="filled"
                    label="state"
                    size="small"
                    sx={{
                      minWidth: "90px",
                      display: module.type === "task" ? null : "none",
                    }}
                    onChange={(input) => {
                      var mod = {
                        name: module.name,
                        type: module.type,
                        state: module.state,
                        id: 0,
                        description: module.description,
                        includeInterval: module.includeInterval,
                        includeTime: module.includeTime,
                        startDate: new Date(),
                        endDate: new Date(),
                        tags: module.tags,
                        email: module.email,
                      };
                      mod.state = input.target.value;
                      setModule(mod);
                    }}
                  >
                    {states.map((option) => (
                      <MenuItem value={option}>{option}</MenuItem>
                    ))}
                  </TextField>
                  {/* tags */}
                  <Autocomplete
                    ListboxProps={{
                      style: { maxHeight: "200px", fontSize: "small" },
                    }}
                    size="small"
                    limitTags={1}
                    multiple
                    options={tags}
                    getOptionLabel={(option) => option.tag}
                    groupBy={(option) => option.group}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        label="tags"
                        size="small"
                        maxRows={1}
                      />
                    )}
                    onChange={(input, newValue) => {
                      var newTags = [];
                      for (var i = 0; i < newValue.length; i++) {
                        newTags.push({
                          tag: newValue[i].tag,
                          group: newValue[i].group,
                        });
                      }
                      var mod = {
                        name: module.name,
                        type: module.type,
                        state: module.state,
                        id: 0,
                        description: module.description,
                        includeInterval: module.includeInterval,
                        includeTime: module.includeTime,
                        startDate: new Date(),
                        endDate: new Date(),
                        tags: module.tags,
                        email: module.email,
                      };
                      mod.tags = newTags;
                      console.log(mod);
                      setModule(mod);
                    }}
                  />
                </Stack>
                {/* description */}
                <TextField
                  variant="filled"
                  label="description"
                  size="small"
                  onChange={(input) => {
                    var mod = {
                      name: module.name,
                      type: module.type,
                      state: module.state,
                      id: 0,
                      description: module.description,
                      includeInterval: module.includeInterval,
                      includeTime: module.includeTime,
                      startDate: new Date(),
                      endDate: new Date(),
                      tags: module.tags,
                      email: module.email,
                    };
                    mod.description = input.target.value;
                    setModule(mod);
                  }}
                ></TextField>
                {/* time */}
                <Stack direction="row" spacing={2} alignItems="center">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* start date */}
                    <DesktopDatePicker
                      label="start date"
                      inputFormat="MM/DD/YYYY"
                      value={startDate}
                      onChange={(input) => {
                        setStartDate(input);
                      }}
                      renderInput={(params) => (
                        <TextField size="small" variant="filled" {...params} />
                      )}
                    />
                    {/* start time */}
                    {!includeTime ? (
                      <></>
                    ) : (
                      <TimePicker
                        label="start time"
                        value={startTime}
                        onChange={(input) => {
                          setStartTime(input);
                        }}
                        renderInput={(params) => (
                          <TextField size="small" variant="filled" {...params} />
                        )}
                      />
                    )}
                    {/* end date */}
                    {!includeInterval ? (
                      <></>
                    ) : (
                      <DesktopDatePicker
                        label="end date"
                        inputFormat="MM/DD/YYYY"
                        value={endDate}
                        onChange={(input) => {
                          setEndDate(input);
                        }}
                        renderInput={(params) => (
                          <TextField size="small" variant="filled" {...params} />
                        )}
                      />
                    )}
                    {/* end time */}
                    {!includeInterval || !includeTime ? (
                      <></>
                    ) : (
                      <TimePicker
                        label="end time"
                        value={endTime}
                        onChange={(input) => {
                          setEndTime(input);
                        }}
                        renderInput={(params) => (
                          <TextField size="small" variant="filled" {...params} />
                        )}
                      />
                    )}
                  </LocalizationProvider>
                </Stack>
              </Stack>
              {/* repeated tasks */}
              {repeat === 1 ? (
                <></>
              ) : (
                <>
                  <Chip
                    variant="filled"
                    size="medium"
                    label={"Modify individual " + module.type + "s down below."}
                    sx={{
                      marginTop: "5px",
                      backgroundColor: "primary.darker",
                      color: "white",
                      fontSize: "large",
                    }}
                  />
                  <Typography sx={{ color: "primary.main", fontSize: "small" }}>
                    Warning: Modifying the template will reset all the{" "}
                    {module.type}s.
                  </Typography>
                  <Stack
                    direction="column"
                    spacing={1}
                    sx={{
                      maxHeight: "18vh",
                      overflowY: "scroll",
                      padding: "5px",
                    }}
                  >
                    {numbering.map((i) => (
                      <Stack direction="column" spacing={1}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          {/* name */}
                          <Chip
                            label={module.type + " " + (i + 1)}
                            sx={{
                              backgroundColor: "primary.lighter",
                              padding: "5px",
                              fontSize: "large",
                            }}
                          />
                          <TextField
                            label="name"
                            size="small"
                            sx={{ width: "130px" }}
                            value={tasks[i].name}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment>
                                  {autoNumbering ? i + 1 : ""}
                                </InputAdornment>
                              ),
                            }}
                            onChange={(input) => {
                              var newTasks = [...tasks];
                              newTasks[i].name = input.target.value;
                              setTasks(newTasks);
                            }}
                          />
                          {/* state */}
                          <TextField
                            select
                            label="state"
                            size="small"
                            sx={{
                              minWidth: "90px",
                              display: module.type === "task" ? null : "none",
                            }}
                            value={tasks[i].state}
                            onChange={(input) => {
                              var newTasks = [...tasks];
                              newTasks[i].state = input.target.value;
                              setTasks(newTasks);
                            }}
                          >
                            {states.map((option) => (
                              <MenuItem value={option}>{option}</MenuItem>
                            ))}
                          </TextField>
                        </Stack>
                        {/* description */}
                        <TextField
                          label="description"
                          size="small"
                          value={tasks[i].description}
                          onChange={(input) => {
                            var newTasks = [...tasks];
                            newTasks[i].description = input.target.value;
                            setTasks(newTasks);
                          }}
                        ></TextField>
                        {/* time */}
                        <Stack direction="row" spacing={2} alignItems="center">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            {/* start date */}
                            <DesktopDatePicker
                              label="start date"
                              inputFormat="MM/DD/YYYY"
                              value={startDates[i]}
                              onChange={(input) => {
                                var t = [...startDates];
                                t[i] = input;
                                setStartDates(t);
                              }}
                              renderInput={(params) => (
                                <TextField size="small" {...params} />
                              )}
                            />
                            {/* start time */}
                            {!includeTime ? (
                              <></>
                            ) : (
                              <TimePicker
                                label="start time"
                                value={startTimes[i]}
                                onChange={(input) => {
                                  var t = [...startTimes];
                                  t[i] = input;
                                  setStartTimes(t);
                                }}
                                renderInput={(params) => (
                                  <TextField size="small" {...params} />
                                )}
                              />
                            )}
                            {/* end date */}
                            {!includeInterval ? (
                              <></>
                            ) : (
                              <DesktopDatePicker
                                label="end date"
                                inputFormat="MM/DD/YYYY"
                                value={endDates[i]}
                                onChange={(input) => {
                                  var t = [...endDates];
                                  t[i] = input;
                                  setEndDates(t);
                                }}
                                renderInput={(params) => (
                                  <TextField size="small" {...params} />
                                )}
                              />
                            )}
                            {/* end time */}
                            {!includeInterval || !includeTime ? (
                              <></>
                            ) : (
                              <TimePicker
                                label="end time"
                                value={endTimes[i]}
                                onChange={(input) => {
                                  var t = [...endTimes];
                                  t[i] = input;
                                  setEndTimes(t);
                                }}
                                renderInput={(params) => (
                                  <TextField size="small" {...params} />
                                )}
                              />
                            )}
                          </LocalizationProvider>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                </>
              )}
            </Stack>
          </Stack>

          <Divider />
          <Stack
            direction="row"
            justifyContent="flex-end"
            justifySelf
            margin={3}
            spacing={3}
          >
            <Button
              variant="text"
              onClick={() => {
                setOpenAddTask(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </Card>
      </Modal>
    </div>
  );
}

export default AddTask;
