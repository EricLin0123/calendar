import express from "express";
import bodyParser from "body-parser";
import User from "../../database/User";
// mongoose functions from Data.js
import {
  addTask,
  deleteTask,
  setTime,
  deleteTag,
  addTag,
  SignUp,
  LogIn,
  Filter,
  getAllTask,
  getAllTag,
  sortTask,
} from "../Data";
const router = express.Router();
router.use(bodyParser.json());
router.get("/test", (req, res) => {
  res.json({ message: "HELLO from Axios." });
  const ss = JSON.stringify({ name: "abc", email: "dd" });
  console.log(ss);
});
router.post("/signup", (req, res) => {
  console.log("here");
  SignUp(req.body.name, req.body.email, req.body.password)
    .then((response) =>
      res.status(200).send({
        status: "success",
        message:
          "name: " +
          req.body.name +
          "email: " +
          req.body.email +
          "password: " +
          req.body.password +
          " succeeded.",
      })
    )
    .catch((e) => {
      console.log(e);
      res.status(200).send({
        status: "error",
        message: "" + e,
      });
    });
});
router.post("/login", (req, res) => {
  LogIn(req.body.email, req.body.password)
    .then((response) => {
      if (response)
        res.status(200).send({
          status: "success",
          message: req.body.email + " succeeded.",
        });
      else
        res.status(200).send({
          status: "error",
          message: "Wrong email or wrong password.",
        });
    })
    .catch((e) => {
      console.log(e);
      res.status(200).send({
        status: "error",
        message: "" + e,
      });
    });
});
router.post("/newtask", (req, res) => {
  const body = req.body;
  console.log(body);
  const {
    email,
    name,
    description,
    taskType,
    state,
    allday,
    startTime,
    endTime,
    tag,
  } = body;
  addTask(
    email,
    name,
    description,
    taskType,
    state,
    allday,
    startTime,
    endTime,
    tag
  )
    .then((response) => {
      res.status(200).send({
        status: "success",
        message: response,
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(200).send({
        status: "error",
        message: "" + e,
      });
    });
});
router.post("/delete", (req, res) => {
  const body = req.body;
  const { email, id } = body;
  deleteTask(email, id)
    .then((response) => {
      res.status(200).send({
        status: "success",
        message: response,
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(200).send({
        status: "error",
        message: "" + e,
      });
    });
});
router.post("/change", (req, res) => {
  const body = req.body;
  const {
    email,
    id,
    newType,
    newName,
    newStartTime,
    newEndTime,
    newAllday,
    newTag,
  } = body;
  setTime(
    email,
    id,
    newType,
    newName,
    newStartTime,
    newEndTime,
    newAllday,
    newTag
  )
    .then((response) => {
      res.status(200).send({
        status: "success",
        message: response,
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(200).send({
        status: "error",
        message: "" + e,
      });
    });
});
router.post("/filter", (req, res) => {
  const body = req.body;
  const { email, filter } = body;
  Filter(email, filter)
    .then((response) => {
      res.status(200).send({
        status: "success",
        message: response,
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(200).send({
        status: "error",
        message: "" + e,
      });
    });
});
router.post("/gettag", (req, res) => {
  const body = req.body;
  const { email } = body;
  getAllTag(email)
    .then((response) => {
      res.status(200).send({
        status: "success",
        message: response,
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(200).send({
        status: "error",
        message: "" + e,
      });
    });
});
router.post("/addtag", (req, res) => {
  const body = req.body;
  const { email, tagType, element } = body;
  addTag(email, tagType, element)
    .then((response) => {
      res.status(200).send({
        status: "success",
        message: response,
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(200).send({
        status: "error",
        message: "" + e,
      });
    });
});
router.post("/gettask", (req, res) => {
  const body = req.body;
  const { email } = body;
  getAllTask(email)
    .then((response) => {
      res.status(200).send({
        status: "success",
        message: response,
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(200).send({
        status: "error",
        message: "" + e,
      });
    });
});
router.post("/sort", (req, res) => {
  const body = req.body;
  const { email, sorter } = body;
  sortTask(email, sorter)
    .then((response) => {
      res.status(200).send({
        status: "success",
        message: response,
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(200).send({
        status: "error",
        message: "" + e,
      });
    });
});
router.post("/deletetag", (req, res) => {
  const body = req.body;
  const { email, tagType, element } = body;
  deleteTag(email, tagType, element)
    .then((response) => {
      res.status(200).send({
        status: "success",
        message: response,
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(200).send({
        status: "error",
        message: "" + e,
      });
    });
});
export default router;
