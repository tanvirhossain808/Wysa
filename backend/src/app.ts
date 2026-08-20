import express from "express";
import authRouter from "./routes/authRoutes";
import chatsRoutes from "./routes/chatRoutes";
import messagesRoutes from "./routes/messageRoutes";
import usersRoutes from "./routes/userRoutes";
import { clerkMiddleware } from "@clerk/express";
import { errorHandler } from "./middleware/errorHandler";
import path from "path";
import cors from "cors";
const app = express();
const allowedOrigins = [
  "http://localhost:8081", // Expo mobile
  "http://localhost:5173", // Vite web dev
  process.env.FRONTEND_URL, // production
].filter(Boolean) as string[];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(clerkMiddleware());
app.use("/health", (req, res) =>
  res.json({ status: "ok", message: "sever is running" }),
);

app.use("/api/auth", authRouter);
app.use("/api/chats", chatsRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/users", usersRoutes);
app.use(errorHandler);

// serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../web/dist")));

  app.get("/{*any}", (_, res) => {
    res.sendFile(path.join(__dirname, "../../web/dist/index.html"));
  });
}
export default app;
