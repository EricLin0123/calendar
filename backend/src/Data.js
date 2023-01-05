const mongoose = require("mongoose");
import { hash } from "bcrypt";
const User = require("../database/User");

async function createUser(name, email, password) {
  try {
    const doc = await User.create({
      name: name,
      email: email,
      password: password,
      task: [],
      tag: Object(),
    });
    console.log(doc);
  } catch (e) {
    console.log(e.message);
  }
}
//ex:

async function addTask(
  userEmail, //String
  taskName, //String
  description,
  taskType, //String : "task" or "event"
  state,
  allDay, // Boolean
  startTime, //Date type
  endTime, //Date type
  tag
) {
  const doc = await User.updateOne(
    { email: userEmail },
    {
      $push: {
        task: {
          description: description,
          taskType: taskType,
          state: state,
          name: taskName,
          allDay: allDay,
          startTime: startTime,
          endTime: endTime,
          tag,
        },
      },
    }
  );
  const oldUser = await User.findOne({ email: userEmail });
  console.log(oldUser.task.slice(-1));
  return oldUser.task.slice(-1)[0]._id;
}
//ex:
// addTask(
//   "big@ii.com",
//   "jump",
//   "event",
//   true,
//   Date.now(),
//   null,
//   "subject",
//   "physics"
// );
async function deleteTask(
  userEmail, //String
  id
) {
  const doc = await User.updateOne(
    { email: userEmail },
    {
      $pull: {
        task: { _id: id },
      },
    }
  );
  return "success";
}
//ex:
//deleteTask("gog@ggf.com", "wake up", "2023-01-02T10:40:33.538+00:00");
async function renameTask(
  userEmail, //String
  taskName, //String
  startTime, //Date type
  newName
) {
  try {
    const doc = await User.updateOne(
      { email: userEmail, "task.name": taskName, "task.startTime": startTime },
      {
        $set: {
          "task.$.name": newName,
        },
      }
    );
    console.log(doc);
  } catch (e) {
    console.log(e);
  }
}
//ex:
//renameTask("gog@ggf.com", "jump", "2023-01-02T13:57:39.128+00:00", "run");
async function setTime(
  userEmail, //String
  id,
  newType,
  newName,
  newDescription,
  newStartTime,
  newEndTime,
  newAllday,
  newTag
) {
  const doc = await User.updateOne(
    { email: userEmail, "task._id": id },
    {
      $set: {
        "task.$.taskType": newType,
        "task.$.description": newDescription,
        "task.$.name": newName,
        "task.$.startTime": newStartTime,
        "task.$.endTime": newEndTime,
        "task.$.allDay": newAllday,
        "task.$.tag": newTag,
      },
    }
  );
  return "change success";
}
//ex:
// setTime(
//   "gog@ggf.com",
//   "run",
//   "2023-01-02T13:57:39.128+00:00",
//   "2001-01-02T13:59:27.508+00:00",
//   "2003-01-02T13:59:27.508+00:00",
//   false
// );
async function deleteTag(userEmail, tagType, element) {
  const doc = await User.findOne({
    email: userEmail,
  });
  var newTags = doc.tag;
  for (var i = 0; i < newTags.length; i++) {
    if (newTags[i].tagType === tagType) {
      if (!newTags[i].element.includes(element)) break;
      newTags[i].element = newTags[i].element.filter((tag) => tag !== element);
      if (newTags[i].element.length === 0) {
        newTags = newTags.filter((category) => category.tagType !== tagType);
      }
      await User.updateOne({ email: userEmail }, { tag: newTags });
      return newTags;
    }
  }
  throw new Error("No such tag found.");
}
//ex:
// deleteTag(
//   "gog@ggf.com",
//   "sleep",
//   "2023-01-02T14:00:37.057+00:00",
//   "subject",
//   "math"
// );
async function addTag(
  userEmail, //String
  tagType,
  element
) {
  const doc = await User.findOne({
    email: userEmail,
  });
  var newTags = doc.tag.slice();
  for (var i = 0; i < newTags.length; i++) {
    if (newTags[i].tagType === tagType) {
      if (newTags[i].element.includes(element))
        throw new Error("The tag is already added.");
      newTags[i].element.push(element);
      await User.updateOne({ email: userEmail }, { tag: newTags });
      return newTags;
    }
  }
  newTags.push({ tagType: tagType, element: [element] });
  await User.updateOne({ email: userEmail }, { tag: newTags });
  return newTags;
}
//ex:
// addTag(
//   "gog@ggf.com",
//   "sleep",
//   "2023-01-02T14:00:37.057+00:00",
//   "exam",
//   "Algorism"
// );
const SignUp = async (name, email, password) => {
  const checkDup = await User.findOne({ email: email });
  if (checkDup) throw new Error("Duplicate email.");
  const newUser = await User.create({
    name: name,
    email: email,
    password: password,
    tasks: [],
    tag: [],
  });
  console.log(newUser);
};
//SignUp("nonoboy", "NONO@ii.com", "erttt898ddd9");
const LogIn = async (email, password) => {
  const oldUser = await User.findOne({
    email: email,
  });
  if (!oldUser) return false;
  console.log(oldUser);
  console.log(oldUser.hash);
  const hashed = await hash(password, oldUser.hash);
  console.log(hashed);
  console.log(oldUser.password);
  return hashed === oldUser.password ? true : false;
};
const Filter = async (email, filter) => {
  const doc = await User.findOne({ email });
  var newTasks = doc.task.slice();
  console.log(filter);
  for (var i = 0; i < filter.length; i++) {
    newTasks = newTasks.filter((task) => {
      if (filter[i].tagType !== null) {
        for (var j = 0; j < task.tag.length; j++) {
          if (
            filter[i].tagType === task.tag[j].tagType &&
            filter[i].element.includes(task.tag[j].element)
          ) {
            return true;
          }
        }
      } else {
        const l = filter[i].element.length;
        var checker = 0;
        for (var j = 0; j < task.tag.length; j++) {
          if (filter[i].element.includes(task.tag[j].element)) {
            checker++;
            if (checker === l) return true;
          }
        }
      }
      return false;
    });
  }
  return newTasks;
};

const getAllTag = async (email) => {
  const doc = await User.findOne({ email });
  const tags = doc.tag.slice();
  return tags;
};
const getAllTask = async (email) => {
  const doc = await User.findOne({ email });
  const tasks = doc.task.slice();
  return tasks;
};
const sortTask = async (email, sorter) => {
  const doc = await User.findOne({ email });
  const tasks = doc.task.slice();
  tasks.sort((a, b) => {
    const x = new Date(a.startTime);
    const y = new Date(b.startTime);
    return x > y ? 1 : x === y ? 0 : -1;
  });
  console.log(tasks);
  for (var i = sorter.length - 1; i >= 0; i--) {
    tasks.sort((a, b) => {
      const newA = a.tag.map((t) => ({ tag: t.element, group: t.tagType }));
      const newB = b.tag.map((t) => ({ tag: t.element, group: t.tagType }));
      const x = newA.some(
        (e) => e.tag === sorter[i].tag && e.group === sorter[i].group
      );
      const y = newB.some(
        (e) => e.tag === sorter[i].tag && e.group === sorter[i].group
      );
      return !x && y ? 1 : x === y ? 0 : -1;
    });
  }
  return tasks;
};
export {
  addTask,
  deleteTask,
  renameTask,
  setTime,
  deleteTag,
  addTag,
  SignUp,
  LogIn,
  Filter,
  getAllTask,
  getAllTag,
  sortTask,
};
