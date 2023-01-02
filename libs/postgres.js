const {Client}=require("pg");

const getConnection = async()=>{
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "admin",
    password: "root",
    database: "platzi_store"
  })
  await client.connect();
  return client;
}

module.exports = getConnection;
