import sql from "mssql/msnodesqlv8.js";
import config from './databaseConfig.mjs'

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => console.log("Database connection failed: ", err));

export { poolPromise };
