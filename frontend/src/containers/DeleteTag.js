import * as React from "react";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { blue } from "@mui/material/colors";
import { Button, TextField, Box, Stack, Typography } from "@mui/material";
import { deleteTag } from "./Connect";

function SimpleDialog(props) {
  const { onClose, selectedValue, open, tags, setTags, email } = props;
  const [type, setType] = React.useState("");
  const [name, setName] = React.useState("");
  function confirm() {
    // confirm delete tag
    if (name.length === 0) alert("Please enter the name of your tag.");
    else {
      const tagType = type.length === 0 ? null : type;
      deleteTag(email, tagType, name)
        .then((response) => {
          if (response.status === "error") throw response.message;
          var newTags = tags.slice();
          const filter = (element) =>
            element.tag == name && element.group == tagType;
          var index = newTags.findIndex(filter);
          newTags.splice(index, 1);
          setTags(newTags);
        })
        .catch((e) => alert(e));
    }
  }
  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Stack
        padding="20px"
        border="2px solid #eeeeee"
        borderRadius="20px"
        direction="column"
        spacing={4}
        width="300px"
        maxWidth={500}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6">Delete tag</Typography>
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
          Dlete
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

export default function DeleteTag({ tags, setTags, email }) {
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
              <RemoveCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Delete tag" />
        </ListItemButton>
      </ListItem>

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
