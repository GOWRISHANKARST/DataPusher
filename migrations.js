const db = require("./db");

async function createTables() {
  const accountExists = await db.schema.hasTable("accounts");
  if (!accountExists) {
    await db.schema.createTable("accounts", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("secret").notNullable().unique();
      table.string("email").notNullable().unique();
    });
  }
  else{
    console.log("Table exist: accounts");
    
  }

  const destinationExists = await db.schema.hasTable("destinations");
  if (!destinationExists) {
    await db.schema.createTable("destinations", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("url").notNullable();
      table.integer("accountId")
           .unsigned()
           .references("id")
           .inTable("accounts")
           .onDelete("CASCADE");
    });
  }
  else{
    console.log("Table exist: destinations"); 
  }

  console.log("Tables created");
  process.exit();
}

createTables();
