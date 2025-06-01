const db = require("../db");

async function createAccount(data) {
  const [id] = await db("accounts").insert(data);
  return getAccountById(id);
}

async function getAccountById(id) {
  return await db("accounts").where({ id }).first();
}

async function getAccountBySecret(secret) {
  return await db("accounts").where({ secret }).first();
}

async function updateAccount(id, data) {
  await db("accounts").where({ id }).update(data);
  return getAccountById(id);
}

function deleteAccount(id) {
  return db("accounts").where({ id }).del();
}

module.exports = {
  createAccount,
  getAccountById,
  getAccountBySecret,
  updateAccount,
  deleteAccount,
};