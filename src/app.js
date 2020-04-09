const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const project = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(project);

  return response.json(project);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const projectIndex = repositories.findIndex((item) => item.id === id);

  if (projectIndex < 0)
    return response.status(400).json({ error: "ID passed not exists." });

  const { title, url, techs } = request.body;

  repositories[projectIndex] = {
    ...repositories[projectIndex],
    title,
    url,
    techs,
  };

  return response.json(repositories[projectIndex]);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const projectIndex = repositories.findIndex((item) => item.id === id);

  if (projectIndex < 0)
    return res.status(400).json({ error: "ID passed not exists." });

  repositories.splice(projectIndex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const projectIndex = repositories.findIndex((item) => item.id === id);

  if (projectIndex < 0)
    return response.status(400).json({ error: "ID passed not exists." });

  repositories[projectIndex].likes++;

  return response.json({ likes: repositories[projectIndex].likes });
});

module.exports = app;
