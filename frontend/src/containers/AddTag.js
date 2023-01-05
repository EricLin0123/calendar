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
import { Button, TextField, Box, Stack, Typography } from "@mui/material";
import { AddTag } from "./Connect";

function SimpleDialog(props) {
  const { onClose, selectedValue, open, tags, setTags, email } = props;
  const [type, setType] = React.useState("");
  const [name, setName] = React.useState("");
  function confirm() {
    // confirm add tag
    if (name.length === 0) alert("Please enter the name of your tag.");
    else {
      const tagType = type.length === 0 ? null : type;
      AddTag(email, tagType, name)
        .then((response) => {
          if (response.status === "error") throw response.message;
          var newTags = tags.slice();
          newTags.push({ tag: name, group: tagType });
          setTags(newTags);
        })
        .catch((e) => alert(e));
    }
  }
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
        <Typography variant="h6">Add tag</Typography>

        <TextField
          required
          id="tagtype"
          value={type}
          onChange={(e) => setType(e.target.value)}
          label="tag type"
          variant="outlined"
        />

        <TextField
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="element"
          label="element"
          type="element"
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
        <Button
          variant="contained"
          onClick={handleClose}
          size="large"
          sx={{ width: "150px" }}
        >
          Cancel
        </Button>
      </Stack>
    </Dialog>
  );
}

export default function Addtag({ tags, setTags, email }) {
  const [opentag, setOpentag] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(tags[1]);

  const tagManagerClickOpen = () => {
    setOpentag(true);
  };

  const tagManagerClose = (value) => {
    setOpentag(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <ListItem disableGutters>
        <ListItemButton onClick={() => tagManagerClickOpen()}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add tag" />
        </ListItemButton>
      </ListItem>

      {/* <Tooltip title="Manage tags" placement="bottom">
        <Fab aria-label="add" size="small" onClick={tagManagerClickOpen}>
          <LocalOfferOutlinedIcon />
        </Fab>
      </Tooltip> */}
      <SimpleDialog
        selectedValue={selectedValue}
        open={opentag}
        onClose={tagManagerClose}
        tags={tags}
        setTags={setTags}
        email={email}
      />
    </div>
  );
}
