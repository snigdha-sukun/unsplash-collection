import mongoose from "mongoose";
import type { Connection } from "mongoose";

let client: Connection | null = null;
const MONGODB_URI = process.env.MONGODB_URI?.replace(
	"${MONGODB_PASSWORD}",
	process.env.MONGODB_PASSWORD ?? "",
);

if (!MONGODB_URI) {
	throw new Error("MONGODB_URI is not defined");
}

interface DbConnection {
	client: Connection;
}

async function connectToDb(): Promise<DbConnection> {
	if (client) {
		return { client };
	}

	await mongoose.connect(MONGODB_URI as string);

	client = mongoose.connection;

	console.log("Connected to the Database");
	return { client };
}

export default connectToDb;
