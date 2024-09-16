import { poolPromise } from "./db.mjs";

export const readStatusOfRequest = async (requestId) => {
  try {
    const pool = await poolPromise;

    const query = `SELECT Status FROM Requests WHERE Request_Id='${requestId}'`;

    const response = await pool.request().query(query);

    return response.recordsets[0];
  } catch (err) {
    console.error(err);
  }
};
