import "dotenv/config";

const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    driver: "msnodesqlv8",
    options: {
      trustedConnection: true,
      enableArithAbort: true,
      encrypt: false,
    },
  };

  export default config;