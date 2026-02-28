import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

import { auth } from "./lib/auth";
import { adminRouter } from "./modules/admin/admin.route";
import { bookingRouter } from "./modules/booking/booking.route";
import { userRouter } from "./modules/user/user.route";
import { tutorRouter } from "./modules/tutors/tutor.route";
import { reviewRouter } from "./modules/review/review.route";
import { notFound } from "./middleware/notFound";
import errorHandler from "./middleware/globalErrorHandler";

const app = express();

const frontendOrigin =
  process.env.FRONTEND_URL || process.env.CLIENT_URL || "http://localhost:3000";

app.use(
  cors({
    origin: frontendOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 200,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/tutor", tutorRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/admin", adminRouter);

app.get("/", (_req, res) => {
  res.send("SkillBridge API running");
});

app.use(notFound);
app.use(errorHandler);

export default app;
