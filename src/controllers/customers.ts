import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { Request, Response } from 'express';
import { $customers } from '../schemas/main/main';

export class CustomerController {
	db: BetterSQLite3Database;
	constructor(db: BetterSQLite3Database) {
		this.db = db;
	}
	public getCustomers = (req: Request, res: Response) => {
		const page = Number(req.query.page) || 1;
		const count = Number(req.query.count) || 20;
		const start = (page - 1) * count;
		const response = this.db
			.select()
			.from($customers)
			.limit(count)
			.offset(start)
			.all();
		return res.send(response);
	};
}
