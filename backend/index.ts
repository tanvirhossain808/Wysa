import v8 from "node:v8";

// Polyfill the missing Bun implementation manually
if (!v8.startupSnapshot) {
  (v8 as any).startupSnapshot = {
    isBuildingSnapshot: () => false,
  };
} else if (!v8.startupSnapshot.isBuildingSnapshot) {
  v8.startupSnapshot.isBuildingSnapshot = () => false;
}

import app from "./src/app";
import { connectDB } from "./src/config/database";
const port = process.env.PORT || 3000;

connectDB()
  .then(() => app.listen(port, () => console.log("server is running", port)))
  .catch((error) => {
    console.error("failed to start the server", error);
    process.exit(1);
  });
