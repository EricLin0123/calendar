const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//Date ex:
//var birthday = new Date(1995, 11, 17, 3,  24,  0);
//                       (yyyy, mm, dd, hr, min, sec)
const tagSchema = new mongoose.Schema({
  tagType: String,
  element: String,
});
const taskSchema = new mongoose.Schema({
  taskType: String, // "task" or "event"
  description: String,
  name: {
    type: String,
    required: [false, "Event or task must have a name."],
    //not required when sign up new account
  },
  allDay: {
    type: Boolean,
    default: false, // Not all day by default
  },
  startTime: {
    type: Date,
    default: () => Date.now(),
  },
  endTime: {
    type: Date,
    default: null,
  },
  tag: [tagSchema],
});

const userSchema = new mongoose.Schema(
  {
    password: String,
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true, // prevent registering same email twice
      required: [true, "Email is requied"],
      validate: {
        validator: (v) => {
          var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          //re is of regular expression
          return re.test(v);
        },
      },
    },
    task: [taskSchema],
    hash: String,
    tag: { type: [mongoose.Schema.Types.Mixed] },
  },
  {
    timeseries: true,
  }
);
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(9);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    this.hash = salt;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
