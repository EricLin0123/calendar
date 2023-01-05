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
import Addtag from "./AddTag";
import DeleteTag from "./DeleteTag";

function SimpleDialog(props) {
  const { onClose, selectedValue, open, tags, setTags, email } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };
  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Manage your Tag</DialogTitle>
      <List sx={{ pt: 0 }}>
        {tags.map((tag) => (
          <ListItem disableGutters>
            <ListItemButton
              onClick={(e) => handleListItemClick(e.target.key)}
              key={tag.tag + " " + tag.group}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <AssignmentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={tag.group + "/" + tag.tag} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disableGutters>
          <Addtag tags={tags} setTags={setTags} email={email} />
        </ListItem>
        <ListItem disableGutters>
          <DeleteTag tags={tags} setTags={setTags} email={email} />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default function TagManager({ tags, setTags, email }) {
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
      <Tooltip title="Manage tags" placement="bottom">
        <Fab aria-label="add" size="small" onClick={tagManagerClickOpen}>
          <LocalOfferOutlinedIcon />
        </Fab>
      </Tooltip>
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
