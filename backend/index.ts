import app from "./src/app";
import { connectDB } from "./src/config/database";
import { createServer } from "http";
import { initializeSocket } from "./src/utils/socket";

const port = process.env.PORT || 3000;
const httpServer = createServer(app);
initializeSocket(httpServer);
connectDB()
  .then(() =>
    httpServer.listen(port, () => console.log("server is running", port)),
  )
  .catch((error) => {
    console.error("failed to start the server", error);
    process.exit(1);
  });
