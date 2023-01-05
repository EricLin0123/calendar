import { Button, TextField, Box, Stack, Typography } from "@mui/material";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import { Fab, Tooltip } from "@mui/material";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";
const tags = ["Exam", "HW"];

function SimpleDialog(props) {
  function confirm() {
    //
  }
  const { onClose, selectedValue, open } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };
  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Stack
        padding="20px"
        border="2px solid #eeeeee"
        borderRadius="20px"
        direction="column"
        spacing={3}
        width="300px"
        maxWidth={500}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6">Add task</Typography>

        <TextField required id="tagtype" label="task name" variant="outlined" />

        <TextField
          required
          id="starttime"
          label="start time"
          type="starttime"
          variant="outlined"
        />
        <TextField
          required
          id="endttime"
          label="end time"
          type="endtime"
          variant="outlined"
        />

        <Button
          variant="contained"
          onClick={confirm}
          size="large"
          sx={{ width: "150px" }}
        >
          Add
        </Button>
      </Stack>
    </Dialog>
  );
}

export default function TaskManager({ setOpenAddTask }) {
  const [opentask, setOpentag] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(tags[1]);
  const tagManagerClickOpen = () => {
    setOpentag(true);
  };
  const taskManagerClose = (value) => {
    setOpentag(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Tooltip title="Add task" placement="bottom">
        <Fab aria-label="add" size="small" onClick={() => setOpenAddTask(true)}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <SimpleDialog
        selectedValue={selectedValue}
        open={false}
        onClose={taskManagerClose}
      />
    </div>
  );
}
