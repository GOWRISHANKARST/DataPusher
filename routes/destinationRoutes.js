const express = require("express");
const {
  createDestination,
  getDestinationById,
  getDestinationsByAccount,
  updateDestination,
  deleteDestination,
} = require("../models/destinationModel");

const router = express.Router();

router.post("/", (req, res) => {
  const dest = createDestination(req.body);
  res.json(dest);
});

router.get("/:id", (req, res) => {
  const dest = getDestinationById(req.params.id);
  if (!dest) return res.status(404).json({ message: "Destination not found" });
  res.json(dest);
});

router.put("/:id", (req, res) => {
  const dest = updateDestination(req.params.id, req.body);
  if (!dest) return res.status(404).json({ message: "Destination not found" });
  res.json(dest);
});

router.delete("/:id", (req, res) => {
  const deleted = deleteDestination(req.params.id);
  if (deleted) return res.json({ message: "Destination deleted" });
  res.status(404).json({ message: "Destination not found" });
});

// Get all destinations for an account
router.get("/account/:accountId", (req, res) => {
  const dests = getDestinationsByAccount(req.params.accountId);
  res.json(dests);
});

module.exports = router;
