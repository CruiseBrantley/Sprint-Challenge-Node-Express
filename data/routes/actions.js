const express = require("express");
const db = require("../helpers/actionModel.js");
const router = express.Router();

router.post("/", (req, res, next) => {
  const actionInformation = req.body;
  db
    .insert(actionInformation)
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
    .then(actions => {
      res.json(actions);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db
    .get(id)
    .then(actions => {
      if (actions === undefined) {
        res.status(404).json({ message: "action not found" });
      } else {
        res.json(actions);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
