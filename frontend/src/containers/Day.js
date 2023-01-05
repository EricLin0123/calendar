import {
  Card,
  CardContent,
  Chip,
  Typography,
  IconButton,
  Divider,
  Button,
  Paper,
  Box,
} from "@mui/material";
import { Stack } from "@mui/system";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Day({ viewTime, viewTasks, setViewTime, viewMode, setViewMode }) {
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

  var timeTable = [];
  for (var i = 0; i <= 24; i++) {
    timeTable.push(i);
  }

  const vt1 = new Date(viewTime.year, viewTime.month - 1, viewTime.date + 1);
  const vt2 = new Date(viewTime.year, viewTime.month - 1, viewTime.date);

  const handleDay = (viewTime, viewTasks) => {
    var timedTasks = [[]];
    for (var i = 0; i < viewTasks.length; i++) {
      if (
        viewTasks[i].includeTime &&
        viewTasks[i].startDate < vt1 &&
        ((viewTasks[i].startDate >= vt2 && !viewTasks[i].includeInterval) ||
          viewTasks[i].endDate >= vt2)
      ) {
        var startTime =
          viewTasks[i].startDate.getHours() * 100 +
          viewTasks[i].startDate.getMinutes();
        var endTime = viewTasks[i].includeInterval
          ? viewTasks[i].endDate.getHours() * 100 +
            viewTasks[i].endDate.getMinutes()
          : startTime;
        if (viewTasks[i].startDate < vt2) {
          startTime = 0;
        }
        if (viewTasks[i].endDate >= vt1) {
          endTime = 2400;
        }
        if (endTime - startTime < 100) endTime = startTime + 200;
        var pushed = false;
        for (var j = 0; j < timedTasks.length; j++) {
          if (pushed) {
            break;
          } else if (timedTasks[j].length === 0) {
            timedTasks[j].push([viewTasks[i], startTime, endTime]);
            pushed = true;
          } else {
            if (endTime <= timedTasks[j][0][1]) {
              timedTasks[j].push([viewTasks[i], startTime, endTime]);
              pushed = true;
            } else if (
              startTime >= timedTasks[j][timedTasks[j].length - 1][2]
            ) {
              timedTasks[j].push([viewTasks[i], startTime, endTime]);
              pushed = true;
            } else {
              for (var k = 0; k < timedTasks[j].length - 1; k++) {
                if (
                  endTime <= timedTasks[j][k + 1][1] &&
                  startTime >= timedTasks[j][timedTasks[k].length - 1][2]
                ) {
                  timedTasks[j].push([viewTasks[i], startTime, endTime]);
                  pushed = true;
                }
              }
            }
          }
        }
        if (!pushed) {
          timedTasks.push([[viewTasks[i], startTime, endTime]]);
        }
      }
    }

    // console.log("timedTasks: ")
    // for(var i=0;i<timedTasks.length;i++){
    //     for(var j=0;j<timedTasks[i].length;j++){
    //         console.log(i, j, timedTasks[i][j][1], timedTasks[i][j][2])
    //     }
    // }

    const timeTableHeight = 72;
    const timeTableSpacing = () => {
      const vh = timeTableHeight / (timeTable.length - 1);
      return "calc(" + vh + "vh - " + 18 + "px)";
    };
    const calcCardHeight = (startTime, endTime) => {
      var hr = Math.floor(endTime / 100) - Math.floor(startTime / 100);
      var min = (endTime % 100) - (startTime % 100);
      var vh = ((hr + min / 60) * timeTableHeight) / (timeTable.length - 1);
      return "calc(" + vh + "vh)";
    };
    const calcCardVerticalPosition = (startTime) => {
      var hr = Math.floor(startTime / 100);
      var min = startTime % 100;
      var vh = ((hr + min / 60) * timeTableHeight) / (timeTable.length - 1);
      return vh + "vh";
    };
    const calcCardWidth = () => {
      const por = 60 / timedTasks.length;
      return "calc(" + por + "vw - " + 120 / timedTasks.length + "px)";
    };

    return (
      <Stack
        direction="row"
        spacing={2}
        sx={{
          height: "75vh",
          overflow: "hidden",
          scrollbarWidth: "0px",
          borderRadius: "25px",
          border: "2px solid grey",
          padding: "10px",
        }}
      >
        <Card sx={{ width: "60vw" }}>
          {/* time mark */}
          <Stack
            direction="column"
            spacing={timeTableSpacing()}
            flexShrink="false"
            sx={{ position: "absolute", height: "74vh" }}
          >
            {timeTable.map((hour) => (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "60vw" }}
              >
                <Typography
                  fontSize="small"
                  sx={{
                    height: "18px",
                    width: "40px",
                    color: "secondary.main",
                  }}
                >
                  {hour}
                </Typography>
                <Divider sx={{ width: "calc(100% - 40px)" }} />
              </Stack>
            ))}
          </Stack>
          <Stack
            direction="row"
            justifyContent="flex-start"
            spacing={2}
            sx={{
              width: "60vw",
              marginLeft: "55px",
              marginTop: "9px",
            }}
          >
            {timedTasks.map((taskColumn) => (
              <Box sx={{ width: calcCardWidth() }}>
                {taskColumn.map((task) => (
                  <Card
                    sx={{
                      position: "absolute",
                      backgroundColor: "secondary.lightest",
                      height: calcCardHeight(task[1], task[2]),
                      marginTop: calcCardVerticalPosition(task[1]),
                      width: calcCardWidth(),
                      maxWidth: "400px",
                      zIndex: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Stack
                      direction="column"
                      alignItems="flex-start"
                      padding={1}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ width: "97%" }}
                      >
                        <Chip label={task[0].name} />
                        <IconButton aria-label="edit" color="secondary.lighter">
                          <MoreVertIcon />
                        </IconButton>
                      </Stack>

                      <Stack direction="row" flexWrap="wrap">
                        {task[0].tags.map((tag) => (
                          <Chip
                            label={tag.group + "/" + tag.tag}
                            variant="outlined"
                            size="small"
                            sx={{ margin: "4px" }}
                          />
                        ))}
                      </Stack>
                      {task[0].state !== "null" ? (
                        <Chip
                          label={task[0].state}
                          variant="filled"
                          size="medium"
                          sx={{ alignSelf: "flex-end" }}
                        />
                      ) : (
                        <></>
                      )}
                    </Stack>
                  </Card>
                ))}
              </Box>
            ))}
          </Stack>
        </Card>

        {/* full time */}
        <Card sx={{ width: "30vw", overflowY: "scroll" }}>
          {["event", "task"].map((type) => (
            <Stack direction="column" padding="10px">
              {viewTasks.map((task) =>
                task.type === type &&
                !task.includeTime &&
                task.startDate < vt1 &&
                ((task.startDate >= vt2 && !task.includeInterval) ||
                  task.endDate >= vt2) ? (
                  <Card
                    sx={{
                      backgroundColor: "secondary.lightest",
                      zIndex: 1,
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Stack
                      direction="column"
                      alignItems="flex-start"
                      padding={1}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ width: "97%" }}
                      >
                        <Chip label={task.name} />
                        <IconButton aria-label="edit" color="secondary.lighter">
                          <MoreVertIcon />
                        </IconButton>
                      </Stack>

                      <Stack
                        direction="column"
                        alignItems="flex-start"
                        padding="5px"
                        spacing={1}
                      >
                        {/* tags */}
                        <Typography variant="h6" color="secondary.text">
                          tags:
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1}
                          divider={<Divider orientation="vertical" flexItem />}
                          flexWrap="wrap"
                        >
                          {task.tags.map((tag) => (
                            <Typography color="secondary.darker">
                              {tag.tag}
                            </Typography>
                          ))}
                        </Stack>

                        {/* description */}
                        {task.description === "" ? (
                          <></>
                        ) : (
                          <>
                            <Typography variant="h6" color="secondary.text">
                              description:
                            </Typography>
                            <Typography color="secondary.darker">
                              {task.description}
                            </Typography>
                          </>
                        )}

                        {task.state === "null" ? (
                          <></>
                        ) : (
                          <Stack direction="row" spacing={2}>
                            <Typography variant="h6" color="secondary.text">
                              state:
                            </Typography>
                            <Chip label={task.state} />
                          </Stack>
                        )}
                      </Stack>
                    </Stack>
                  </Card>
                ) : (
                  <></>
                )
              )}
            </Stack>
          ))}
        </Card>
      </Stack>
    );
  };

  return (
    <Stack
      sx={{
        borderRadius: "20px",
        padding: "10px",
        height: "78vh",
        alignItems: "center",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/* Day */}
        <Stack
          direction="row"
          alignItems="center"
          sx={{ height: "30px", padding: "20px" }}
        >
          <IconButton
            onClick={() => {
              const newTime = new Date(
                viewTime.year,
                viewTime.month - 1,
                viewTime.date - 1
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
            label={
              month_full[viewTime.month] +
              " " +
              viewTime.date +
              ", " +
              viewTime.year
            }
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
                viewTime.month - 1,
                viewTime.date + 1
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

        <Button
          variant="contained"
          sx={{ height: "40px", backgroundColor: "primary.main" }}
          onClick={() => {
            console.log(viewTasks);
            setViewMode("month");
          }}
        >
          <CalendarMonthIcon />
        </Button>
      </Stack>

      <div>{handleDay(viewTime, viewTasks)}</div>
    </Stack>
  );
}

export default Day;
