import { Sequelize } from "sequelize";
import { config } from "dotenv";

import path from "path";
config({ path: path.resolve(__dirname, "../../.env") });

// Load environment variables

export const sequelize = new Sequelize({
  database: process.env.DB_NAME || "", // Database name
  username: process.env.DB_USER || "", // Database username
  password: process.env.DB_PASSWORD || "", // Database password
  host: process.env.DB_HOST || "", // Database host
  port: parseInt(process.env.DB_PORT as string), // Database port
  dialect: "mysql", // Change to 'postgres', 'sqlite', etc., if needed
  pool: {
    max: 20, // Maximum number of connections in the pool
    min: 2, // Minimum number of connections in the pool
    acquire: 30000, // Maximum time (ms) to try getting a connection before throwing an error
    idle: 60000, // Maximum time (ms) a connection can be idle before being released
  },
  logging: true, // Disable logging (optional)
});
// Test the connection

export default sequelize;
