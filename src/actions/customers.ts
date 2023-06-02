import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { $customers } from '../schemas/main/main';

const sqlite = new Database('./src/main.db');
const db = drizzle(sqlite);

export const getCustomers = (req: any, res: any) => {
	const page = Number(req.query.page) || 1;
	const count = Number(req.query.count) || 20;
	const start = (page - 1) * count;
	const response = db
		.select()
		.from($customers)
		.limit(count)
		.offset(start)
		.all();
	res.send(response);
};

export const getCustomer = (req: any, res: any) => {

	res.send();
};
