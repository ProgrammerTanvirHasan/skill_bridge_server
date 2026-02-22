import {
  reviewRouter
} from "./chunk-3ELUDX6E.js";
import {
  tutorRouter
} from "./chunk-ACAHUFZF.js";
import {
  userRouter
} from "./chunk-6UASTSLU.js";
import {
  adminRouter
} from "./chunk-WKSFBFGG.js";
import {
  bookingRouter
} from "./chunk-U2CGDLX4.js";
import {
  auth
} from "./chunk-SD3U7ZLC.js";
import {
  globalErrorHandler_default
} from "./chunk-U7TOEICV.js";
import {
  notFound
} from "./chunk-UP5KOSGM.js";

// src/app.ts
import express from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
var app = express();
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true
  })
);
app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/user", userRouter);
app.use("/api/tutor", tutorRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/admin", adminRouter);
app.get("/", (req, res) => {
  res.send("SkillBridge API running");
});
app.use(notFound);
app.use(globalErrorHandler_default);
var app_default = app;

export {
  app_default
};
