const express = require("express");
const { getAccountBySecret } = require("../models/accountModel");
const { getDestinationsByAccount } = require("../models/destinationModel");

const router = express.Router();

router.all("/incoming_data", (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Invalid Data" });
  }

  const contentType = req.headers["content-type"];
  if (!contentType || !contentType.includes("application/json")) {
    return res.status(400).json({ message: "Invalid Data" });
  }

  const secret = req.body.secret;
  const data = req.body.data;

  if (!secret) {
    return res.status(401).json({ message: "Un Authenticate" });
  }

  const account = getAccountBySecret(secret);
  if (!account) {
    return res.status(401).json({ message: "Un Authenticate" });
  }

  const destinations = getDestinationsByAccount(account.id);

  // Simulate sending data to destinations
  destinations.forEach(dest => {
    console.log(`Sending data to ${dest.url}:`, data);
    // In real implementation, use axios/fetch to POST
  });

  res.json({ message: "Data sent to destinations", count: destinations.length });
});

module.exports = router;
