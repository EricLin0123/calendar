import { Router } from "express";
import CalendarRouter from "./Calendar.js";
const router = Router();
router.use("/", CalendarRouter);
export default router;
