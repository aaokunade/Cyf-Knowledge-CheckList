import { Pool } from "pg";
require("dotenv").config();

const dbUrl = process.env.DATABASE_URL || "postgres://localhost:5432/cyf";

const pool = new Pool({
	connectionString: dbUrl,
	ssl: {
		rejectUnauthorized: false,
	  },
	connectionTimeoutMillis: 5000,
});

export const connectDb = async () => {
	let client;
	try {
		client = await pool.connect();
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
	console.log("Postgres connected to", client.database);
	client.release();
};

export const disconnectDb = () => pool.close();

export default { query: pool.query };
// export const pool = new Pool(configObject);