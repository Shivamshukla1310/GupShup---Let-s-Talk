import express from "express";
import cookieParser from "cookie-parser"; //  When a client sends an HTTP request to an Express server, it might include a Cookie header containing various cookies previously set by the server or other domains. cookie-parser reads this header.
import path from "path"; // we dont need to install it as it comes with node and express
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";

const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

app.use(express.json({ limit: "5mb" })); // req.body
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes); // This are use to create prefix for routees so that it can follow the path correctly
app.use("/api/messages", messageRoutes);

// make ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist"))); // here we  are basically taking dist folder under frontend and making it our static asset

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// if (ENV.NODE_ENV === "production") {
//   const frontendPath = path.join(__dirname, "../../../frontend/dist");

//   app.use(express.static(frontendPath));

//   app.get("*", (_, res) => {
//     res.sendFile(path.join(frontendPath, "index.html"));
//   });
// }


server.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});
