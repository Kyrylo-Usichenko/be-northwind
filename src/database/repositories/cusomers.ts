import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { customersTable } from '../schema';

export class CustomersRepository {
	constructor(private db: BetterSQLite3Database) {}
	public getAll = (start: number, count: number) => {
		const customers = this.db
			.select()
			.from(customersTable)
			.limit(count)
			.offset(start)
			.all();
		return customers;
	};
}
