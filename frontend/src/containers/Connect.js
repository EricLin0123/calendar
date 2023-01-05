import axios from "../axios";
const LogIn = async (email, password) => {
  const {
    data: { status, message },
  } = await axios.post("/login", {
    password: password,
    email: email,
  });
  console.log({ status, message });
  if (status === "success") return message;
  else throw new Error(message);
};
const Signup = async (name, email, password) => {
  const {
    data: { status, message },
  } = await axios.post("/signup", {
    name: name,
    email: email,
    password: password,
  });
  if (status === "success") return message;
  else throw new Error(message);
};
const CreateTask = async (tasks) => {
  var ids = [];
  var check = [];
  var task;
  for (var i = 0; i < tasks.length; i++) {
    task = tasks[i];
    const {
      data: { status, message },
    } = await axios.post("/newtask", {
      email: task.email,
      name: task.name,
      description: task.description,
      taskType: task.type,
      state: task.state,
      allday: !task.includeTime,
      startTime: task.startDate,
      endTime: task.includeInterval ? task.endDate : null,
      tag: task.tags.map((tag) => ({ tagType: tag.group, element: tag.tag })),
    });
    check.push(status);
    ids.push(message);
  }
  return {
    status: check.includes("error") ? "error" : "success",
    message: ids,
  };
};
const DeleteTask = async () => {
  const {
    data: { status, message },
  } = await axios.post("/delete", {
    email: "lllion66666@gmail.com",
    id: "63b323d8d43848cce1bce467",
  });
  console.log(message);
};
const FilterTask = async (email, filter) => {
  const {
    data: { status, message },
  } = await axios.post("/filter", {
    email: email,
    filter: filter,
  });
  return { status, message };
};
const getTags = async (email) => {
  const {
    data: { status, message },
  } = await axios.post("/gettag", {
    email: email,
  });
  return { status, message };
};
const getTasks = async (email) => {
  const {
    data: { status, message },
  } = await axios.post("/gettask", {
    email: email,
  });
  return { status, message };
};
const AddTag = async (email, tagType, element) => {
  const {
    data: { status, message },
  } = await axios.post("/addtag", {
    email: email,
    tagType: tagType,
    element: element,
  });
  return { status, message };
};
const deleteTag = async (email, tagType, element) => {
  const {
    data: { status, message },
  } = await axios.post("/deletetag", {
    email: email,
    tagType: tagType,
    element: element,
  });
  console.log(message);
  return { status, message };
};
const EditTask = async () => {
  const {
    data: { status, message },
  } = await axios.post("/change", {
    email: "lllion66666@gmail.com",
    id: "63b324f75e7b1069f3bd2590",
    newName: "sleeeeeeeeeeep",
    newType: "event",
    newAllday: true,
    newStartTime: new Date(2023, 1, 1, 9, 0, 0),
    newEndTime: new Date(2023, 1, 1, 17, 0, 0),
    newTag: [
      { tagType: null, element: "Star" },
      { tagType: null, element: "Important" },
      { tagType: "stuff", element: "Health" },
    ],
  });
  console.log(message);
};
const SortTask = async (email, sorter) => {
  const {
    data: { status, message },
  } = await axios.post("/sort", {
    email: email,
    sorter: sorter,
  });
  console.log(message);
  return { status, message };
};
export {
  LogIn,
  Signup,
  CreateTask,
  DeleteTask,
  EditTask,
  FilterTask,
  deleteTag,
  AddTag,
  getTags,
  getTasks,
  SortTask,
};
