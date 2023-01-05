import {
  Card,
  CardContent,
  Tooltip,
  Chip,
  Typography,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import { Stack } from "@mui/system";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Month({
  tags,
  viewTime,
  viewTasks,
  setViewTime,
  viewMode,
  setViewMode,
  setOpenAddTask,
  setAddTaskTime
}) {
  const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const month_full = [
    "December",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
  ];
  const month_short = [
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
  ];

  const handleMonth = (viewTime, viewTasks, setViewTime, setViewMode) => {
    const firstDay = new Date(viewTime.year, viewTime.month - 1, 1);
    const firstMon = new Date(
      viewTime.year,
      viewTime.month - 1,
      1 - firstDay.getDay()
    );
    const dayNum = new Date(viewTime.year, viewTime.month, 0).getDate();
    const rowNum = Math.ceil((dayNum + firstDay.getDay() - 1) / 7);

    var viewTasksMonth = [];
    var iterDate = firstMon;
    // firstMon is actually the first Monday - 1
    for (var i = 0; i < rowNum; i++) {
      var weekTasks = [];
      for (var j = 0; j < 7; j++) {
        iterDate = new Date(
          iterDate.getFullYear(),
          iterDate.getMonth(),
          iterDate.getDate() + 1
        );
        weekTasks.push({
          year: iterDate.getFullYear(),
          month: iterDate.getMonth() + 1,
          date: iterDate.getDate(),
          tasks: [],
        });
      }
      viewTasksMonth.push(weekTasks);
    }

    for (let i = 0; i < viewTasks.length; i++) {
      const startBox =
        Math.floor(
          (viewTasks[i].startDate.getTime() - firstMon.getTime()) /
            (1000 * 3600 * 24)
        ) - 1;
      if (viewTasks[i].includeInterval) {
        const endBox =
          Math.floor(
            (viewTasks[i].endDate.getTime() - firstMon.getTime()) /
              (1000 * 3600 * 24)
          ) - 1;
        for (var j = startBox; j <= endBox; j++) {
          if (j >= 0 && j < dayNum) {
            viewTasksMonth[Math.floor(j / 7)][j % 7].tasks.push(viewTasks[i]);
          }
        }
      } else {
        if (startBox >= 0 && startBox < dayNum) {
          viewTasksMonth[Math.floor(startBox / 7)][startBox % 7].tasks.push(
            viewTasks[i]
          );
        }
      }
    }

    return (
      <Stack
        direction="column"
        spacing={2}
        sx={{
          height: "75vh",
          overflow: "hidden",
          overflowY: "scroll",
          scrollbarWidth: "0px",
          borderRadius: "25px",
          border: "2px solid grey",
          padding: "10px",
        }}
      >
        {viewTasksMonth.map((weekTasks) => (
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignContent="center"
          >
            {weekTasks.map((dateTasks) => (
              <Card
                sx={{
                  variant: "outlined",
                  width: "12vw",
                  minHeight: "200px",
                  minWidth: "140px",
                  backgroundColor: "secondary.lightest",
                }}
              >
                {dateTasks.month === viewTime.month ? (
                  // the current month
                  <CardContent>
                    {/* date */}
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-around"
                      sx={{ width: "12vw" }}
                    >
                      <Tooltip title="inspect" placement="top" size="medium">
                        <Button
                          variant="filled"
                          color="secondary.lighter"
                          sx={{ fontSize: "large" }}
                          onClick={() => {
                            setViewTime({
                              year: dateTasks.year,
                              month: dateTasks.month,
                              date: dateTasks.date,
                            });
                            setViewMode("day");
                          }}
                        >
                          {"\t" +
                            month_short[dateTasks.month] +
                            "\t" +
                            dateTasks.date}
                        </Button>
                      </Tooltip>
                      <IconButton
                        aria-label="add"
                        color="secondary.lighter"
                        sx={{ margin: "10px" }}
                        onClick={()=>{
                          setOpenAddTask(true)
                          setAddTaskTime({
                            year: dateTasks.year,
                            month: dateTasks.month,
                            date: dateTasks.date,
                          })
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Stack>
                    <Divider />
                    {/* tasks and events */}
                    <Stack direction="column">
                      {dateTasks.tasks.map((task) => (
                        <Card sx={{ margin: "5px" }}>
                          <CardContent>
                            <Stack
                              direction="column"
                              spacing="2px"
                              alignItems="flex-start"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ width: "100%" }}
                              >
                                <Chip label={task.name} />
                                <IconButton
                                  aria-label="edit"
                                  color="secondary.lighter"
                                >
                                  <MoreVertIcon />
                                </IconButton>
                              </Stack>
                              <Stack direction="row" flexWrap="wrap">
                                {task.tags.map((tag) => (
                                  <Chip
                                    label={
                                      tag.group
                                        ? tag.group + "/" + tag.tag
                                        : tag.tag
                                        ? tag.tag
                                        : null
                                    }
                                    variant="outlined"
                                    size="small"
                                    sx={{ margin: "2px" }}
                                  />
                                ))}
                              </Stack>
                              {task.state !== "null" ? (
                                <Chip
                                  label={task.state}
                                  variant="filled"
                                  size="small"
                                  sx={{ alignSelf: "flex-end" }}
                                />
                              ) : (
                                <></>
                              )}
                            </Stack>
                          </CardContent>
                        </Card>
                      ))}
                    </Stack>
                  </CardContent>
                ) : (
                  // not the current month
                  <CardContent>
                    {/* date */}
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-around"
                      sx={{ width: "12vw" }}
                    >
                      <Tooltip title="inspect" placement="top" size="medium">
                        <Button
                          variant="filled"
                          color="secondary.lighter"
                          sx={{ fontSize: "large" }}
                          onClick={() => {
                            setViewTime({
                              year: dateTasks.year,
                              month: dateTasks.month,
                              date: dateTasks.date,
                            });
                            setViewMode("day");
                          }}
                        >
                          {"\t" +
                            month_short[dateTasks.month] +
                            "\t" +
                            dateTasks.date}
                        </Button>
                      </Tooltip>
                      <IconButton
                        aria-label="add"
                        color="secondary.lighter"
                        sx={{ margin: "10px" }}
                        onClick={()=>{
                          setOpenAddTask(true)
                          setAddTaskTime({
                            year: dateTasks.year,
                            month: dateTasks.month,
                            date: dateTasks.date,
                          })
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Stack>
                    <Divider />
                    {/* tasks and events */}
                    <Stack direction="column">
                      {dateTasks.tasks.map((task) => (
                        <Card sx={{ margin: "5px" }}>
                          <CardContent>
                            <Stack
                              direction="column"
                              spacing="2px"
                              alignItems="flex-start"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ width: "100%" }}
                              >
                                <Chip label={task.name} />
                                <IconButton
                                  aria-label="edit"
                                  color="secondary.lighter"
                                >
                                  <MoreVertIcon />
                                </IconButton>
                              </Stack>
                              <Stack direction="row" flexWrap="wrap">
                                {task.tags.map((tag) => (
                                  <Chip
                                    label={
                                      tag.group
                                        ? tag.group + "/" + tag.tag
                                        : tag.tag
                                        ? tag.tag
                                        : null
                                    }
                                    variant="outlined"
                                    size="small"
                                    sx={{ margin: "2px" }}
                                  />
                                ))}
                              </Stack>
                              {task.state !== "null" ? (
                                <Chip
                                  label={task.state}
                                  variant="filled"
                                  size="small"
                                  sx={{ alignSelf: "flex-end" }}
                                />
                              ) : (
                                <></>
                              )}
                            </Stack>
                          </CardContent>
                        </Card>
                      ))}
                    </Stack>
                  </CardContent>
                )}
              </Card>
            ))}
          </Stack>
        ))}
      </Stack>
    );
  };

  return (
    <div>
      <Stack
        sx={{
          borderRadius: "20px",
          padding: "10px",
          height: "78vh",
          alignItems: "center",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          {/* Month */}
          <Stack
            direction="row"
            alignItems="center"
            sx={{ height: "30px", padding: "20px" }}
          >
            <IconButton
              onClick={() => {
                const newTime = new Date(
                  viewTime.year,
                  viewTime.month - 1 - 1,
                  viewTime.date
                );
                setViewTime({
                  year: newTime.getFullYear(),
                  month: newTime.getMonth() + 1,
                  date: newTime.getDate(),
                });
              }}
            >
              <ArrowBackIosOutlinedIcon />
            </IconButton>
            <Chip
              label={month_full[viewTime.month] + ", " + viewTime.year}
              sx={{
                width: "300px",
                fontSize: "large",
                backgroundColor: "secondary.darker",
                color: "white",
              }}
            />
            <IconButton
              onClick={() => {
                const newTime = new Date(
                  viewTime.year,
                  viewTime.month - 1 + 1,
                  viewTime.date
                );
                setViewTime({
                  year: newTime.getFullYear(),
                  month: newTime.getMonth() + 1,
                  date: newTime.getDate(),
                });
              }}
            >
              <ArrowForwardIosOutlinedIcon />
            </IconButton>
          </Stack>
        </Stack>

        <div>{handleMonth(viewTime, viewTasks, setViewTime, setViewMode)}</div>
      </Stack>

    </div>
  );
}

export default Month;
