const express = require("express");
const router = express.Router();
const { dataBase } = require("../data");

router.get("/", (req, res) => {
  res.json(dataBase.projects);
});

router.get("/:projectId", (req, res) => {
  const project = dataBase.projects.find(
    (project) => project.id === parseInt(req.params.projectId)
  );
  if (!project) {
    return res.status(401).json({
      error: true,
      msg: "Not founded",
      data: {},
    });
  }
  return res.status(200).json({
    error: false,
    msg: "",
    data: project,
  });
});

function setProject(req, res, next) {
  next();
}

module.exports = router;
