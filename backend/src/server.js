import express from "express";
import cors from "cors";
//import db from './db';
import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
import routes from "./routes";
import { User, Task, Tag } from "../database/User";
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("mongo db connection created"));
const app = express();
app.use(cors());
app.use("/", routes);
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//run();
async function run() {
  try {
    const user = await User.findOne({
      name: "David",
      age: 34,
      email: "gg@eeett",
    });
    console.log(user);
    console.log(user.namedEmail);
    await user.save();
  } catch (e) {
    console.log(e.message);
  }
}
