import { poolPromise } from "./db.mjs";

export const updateOutputImage = async (inputUrl, outputUrl) => {
  try {
    const pool = await poolPromise;

    const query = `UPDATE Images set Output_Url = '${outputUrl}' where Input_Url='${inputUrl}'`;

    await pool.request().query(query);
  } catch (err) {
    console.error(err);
  }
};

export const updateRequestStatus = async (request_Id) => {
  try {
    const pool = await poolPromise;

    const query = `UPDATE Requests set Status='completed' where Request_Id='${request_Id}'`;

    await pool.request().query(query);
  } catch (err) {
    console.error(err);
  }
};
