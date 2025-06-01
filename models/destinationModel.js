const db = require("../db");

async function createDestination(data) {
  const [id] = await db("destinations").insert(data);
  return getDestinationById(id);
}

function getDestinationById(id) {
  return db("destinations").where({ id }).first();
}

function getDestinationsByAccount(accountId) {
  return db("destinations").where({ accountId });
}

async function updateDestination(id, data) {
  await db("destinations").where({ id }).update(data);
  return getDestinationById(id);
}

function deleteDestination(id) {
  return db("destinations").where({ id }).del();
}

function deleteDestinationsByAccount(accountId) {
  return db("destinations").where({ accountId }).del();
}

module.exports = {
  createDestination,
  getDestinationById,
  getDestinationsByAccount,
  updateDestination,
  deleteDestination,
  deleteDestinationsByAccount,
};
