const express = require("express");
const db = require("../helpers/projectModel.js");
const router = express.Router();

router.post("/", (req, res, next) => {
  const projectInformation = req.body;
  db
    .insert(projectInformation)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(400).send({ Error: "must be a unique value" });
    });
});

router.delete("/:id", function(req, res) {
  const { id } = req.params;
  db
    .remove(id)
    .then(response => {
      if (response !== 0) res.json("successfully deleted");
      else res.json("could not be deleted");
    })
    .catch(err => {
      res.status(500).json({ erro: err });
    });
});

router.put("/:id", function(req, res) {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(response => {
      if (response !== null) res.json("successfully updated");
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/", (req, res) => {
  db
    .get()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db
    .get(id)
    .then(projects => {
      if (projects === undefined) {
        res.status(404).json({ message: "project not found" });
      } else {
        res.json(projects);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
