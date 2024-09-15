import { poolPromise } from "./db.mjs";
import { getSQLSupportedDateTime } from "../utils/datetime.mjs";

export const insertRecord = async (tableName, obj) => {
  try {
    const pool = await poolPromise;

    const query = queryBuilder(tableName, obj);

    let response = await pool.request().query(query);

    return response.recordset[0].ID;
  } catch (err) {
    console.error(err);
  }
};

const queryBuilder = (tableName, obj) => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const formattedValues = values.map(getFormattedValues);

  const columns = keys.join(", ");
  const columnValues = formattedValues.join(", ");

  const query = `INSERT INTO ${tableName} (${columns}) OUTPUT INSERTED.ID VALUES (${columnValues})`;

  return query;
};

const getFormattedValues = (value) => {
  if (!value) return "NULL";
  if (typeof value === "string") {
    return `'${value}'`;
  } else if (value instanceof Date) {
    return `'${getSQLSupportedDateTime(value)}'`;
  } else {
    return value;
  }
};
