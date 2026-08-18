import express from "express";
import authRouter from "./routes/authRoutes";
import chatsRoutes from "./routes/chatRoutes";
import messagesRoutes from "./routes/messageRoutes";
import usersRoutes from "./routes/userRoutes";
const app = express();
app.use(express.json());
app.use("/health", (req, res) =>
  res.json({ status: "ok", message: "sever is running" }),
);

app.use("api/auth", authRouter);
app.use("api/chats", chatsRoutes);
app.use("api/messages", messagesRoutes);
app.use("api/users", usersRoutes);
export default app;
