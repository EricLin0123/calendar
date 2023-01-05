import { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Stack,
  Typography,
  Alert,
} from "@mui/material";
import { LogIn, Signup, getTags, getTasks } from "./Connect";
function Login({ setLoggedIn, changeEmail, setTags, setViewTasks }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sign, setSign] = useState(false);
  const log_in = () => {
    if (email.length === 0) alert("Please Enter Your Email.");
    else if (password.length === 0) alert("Please Enter Your Password.");
    else {
      LogIn(email, password)
        .then((response) => {
          return getTags(email);
        })
        .then((response) => {
          console.log(response);
          if (response.status === "error") throw response.message;
          var newTags = [];
          const data = response.message;
          console.log(data);
          for (var i = 0; i < (data ? data?.length : 0); i++) {
            for (var j = 0; j < data[i].element.length; j++) {
              newTags.push({ tag: data[i].element[j], group: data[i].tagType });
            }
          }
          console.log(newTags);
          setTags(newTags); //comment this line to get template tags
          return getTasks(email);
        })
        .then((response) => {
          if (response.status === "error") throw response.message;
          const data = response.message;
          const tasks = data.map((task) => {
            console.log(typeof task.startTime);
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
          changeEmail(email);
          setLoggedIn(true);
        })
        .catch((e) => alert(e));
    }
  };
  const sign_up = () => {
    if (!sign) setSign(true);
    else {
      if (name.length === 0) alert("Please enter your name.");
      else if (email.length === 0) alert("Please enter your email.");
      else if (password.length === 0) alert("Please enter your password.");
      else {
        Signup(name, email, password)
          .then((response) => {
            alert("You have successfully registered!");
            setSign(false);
          })
          .catch((e) =>
            e.toString()[7] === "V"
              ? alert("Email format error.")
              : e.toString()[14] === "D"
              ? alert("Duplicate email")
              : alert(e)
          );
      }
    }
  };
  return (
    <Box
      sx={{
        position: "relative",
        top: "20vh",
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
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
        <Typography variant="h6">{sign ? "Sign Up" : "Log In"}</Typography>

        <div style={{ display: sign ? null : "none" }}>
          <TextField
            required
            id="name"
            label="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
        </div>

        <TextField
          required
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="email address"
          variant="outlined"
        />

        <TextField
          required
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="password"
          type="password"
          variant="outlined"
        />
        <Button
          variant="contained"
          onClick={sign_up}
          size="large"
          sx={{ width: "150px" }}
        >
          Sign Up
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            sign ? setSign(false) : log_in();
          }}
          size="large"
          sx={{ width: "150px" }}
        >
          {sign ? "Go Back" : "Log In"}
        </Button>
      </Stack>
    </Box>
  );
}

export default Login;
