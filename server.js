const express = require("express");

const projects = require("./data/routes/projects");
const actions = require("./data/routes/actions");

const server = express();

server.use(express.json());

server.use("/api/projects", projects);
//server.use('/api/actions', actions);

server.get("/", (req, res) => {
  res.json({ api: "The server works." });
});

const port = 8000;
server.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`));
