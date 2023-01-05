const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  name: String, //data types
  age: {
    type: Number,
    min: 1,
    max: 130,
    validate: {
      validator: (v) => v % 2 == 0,
      message: (props) => `${props.value} is not even`,
    },
  },
  email: {
    type: String,
    minLength: 1,
    required: true,
    lowercase: true, // automatically change input into lower case
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  // bestFriend: {
  //   type: mongoose.SchemaType.ObjectId,
  //   ref: "User", // reference User model
  // },
  hobbies: [String],
  address: addressSchema,
});

userSchema.methods.sayhi = function () {
  console.log(`Hi my name is ${this.name}`);
};

userSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, "i") }); //regular expression and case insensitive
};

userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

userSchema.virtual("namedEmail").get(function () {
  return `${this.name} <${this.email}>`;
});

userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

userSchema.post("save", function (doc, next) {
  doc.sayhi();
  next();
});

module.exports = mongoose.model("User", userSchema); //model(collection name is "User", pass in user schema)
