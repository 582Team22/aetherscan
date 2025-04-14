const express = require("express");
const userRoutes = require("./routes/userRoutes");
const detectionRoutes = require("./routes/droneDetection");
const knex = require('knex')(require('./knexfile').development);

const app = express();

const cors = require('cors');
const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/users", userRoutes);
app.use("/droneDetected", detectionRoutes);

// Ex. route with SQLite3
// app.get("/users", async (req, res) => {
//   const users = await sqliteDB.select("*").from("users");
//   res.json(users);
// });

app.get("/users", async (req, res) => {
  try {
    const users = await knex.select("*").from("users");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// From YouTube video
// app.get("/api", (req, res) => {
//   res.json({"fruits": ["apple", "orange", "banana"]});
// });

let port = 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

