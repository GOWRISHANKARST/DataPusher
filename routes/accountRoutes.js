const express = require("express");
const {
  createAccount,
  getAccountById,
  updateAccount,
  deleteAccount,
} = require("../models/accountModel");
const { deleteDestinationsByAccount } = require("../models/destinationModel");

const router = express.Router();

router.post("/", (req, res) => {
    console.log(req.headers);
let cl_x_token = req.headers['cl-x-token'];
if(cl_x_token == "12345")
{
    const account = createAccount(req.body);
  res.json(account);
}
else{
    res.json({
        "message": "Un Authenticate"
      }
      )
}
  
});

router.get("/:id", async (req, res) => {
    
  const acc = await getAccountById(req.params.id);
  
  if (!acc) return res.status(404).json({ message: "Account not found" });
  res.json(acc);
});

router.put("/:id", (req, res) => {
  const acc = updateAccount(req.params.id, req.body);
  if (!acc) return res.status(404).json({ message: "Account not found" });
  res.json(acc);
});

router.delete("/:id", (req, res) => {
  const deleted = deleteAccount(req.params.id);
  if (deleted) {
    deleteDestinationsByAccount(req.params.id);
    return res.json({ message: "Account and associated destinations deleted" });
  }
  res.status(404).json({ message: "Account not found" });
});

module.exports = router;
