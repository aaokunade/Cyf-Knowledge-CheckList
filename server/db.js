import { Pool } from "pg";
require("dotenv").config();
const password = process.env.ANYTHING;
const userName = process.env.USER;
let pool;

if(process.env.NODE_ENV === "development"){
	const dbUrl = `postgres://${userName}:${password}@localhost:5432/cyf`;
	pool = new Pool({
		connectionString: dbUrl,
	});
} else {
	const dbUrl = process.env.DATABASE_URL;
	pool = new Pool({
		connectionString: dbUrl,
		ssl: {
			rejectUnauthorized: false,
		},
		connectionTimeoutMillis: 5000,
	});
}


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



// export default { query: pool.query };
export default { query: pool.query.bind(pool) };
// export const pool = new Pool(configObject);
